import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import type { Role } from "@prisma/client";

function planToRole(plan: string | undefined): Role {
  if (plan === "school") return "SCHOOL_ADMIN";
  if (plan === "pro") return "PRO";
  return "FREE";
}

async function syncSubscription(
  customerId: string,
  subscriptionId: string,
  status: string,
  plan: string | undefined
) {
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
    select: { id: true },
  });
  if (!user) return;

  const active = status === "active" || status === "trialing";
  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionId,
      subscriptionStatus: status,
      role: active ? planToRole(plan) : "FREE",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.mode !== "subscription") break;
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        await syncSubscription(
          session.customer as string,
          sub.id,
          sub.status,
          sub.metadata?.plan ?? session.metadata?.plan
        );
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object;
        await syncSubscription(
          sub.customer as string,
          sub.id,
          sub.status,
          sub.metadata?.plan
        );
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object;
        await db.user.updateMany({
          where: { stripeCustomerId: sub.customer as string },
          data: { subscriptionId: null, subscriptionStatus: "canceled", role: "FREE" },
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const hasSubscription = invoice.parent?.type === "subscription_details";
        if (hasSubscription) {
          await db.user.updateMany({
            where: { stripeCustomerId: invoice.customer as string },
            data: { subscriptionStatus: "past_due" },
          });
        }
        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
