import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe, STRIPE_PRICES, getOrCreateStripeCustomer } from "@/lib/stripe";
import { requireUser } from "@/lib/route-utils";

export async function POST(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const body = await req.json().catch(() => ({}));
  const plan = body?.plan as "pro" | "school";

  if (plan !== "pro" && plan !== "school") {
    return NextResponse.json({ error: "خطة غير صالحة" }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: { id: userId! },
    select: { id: true, email: true, name: true, stripeCustomerId: true },
  });

  if (!user?.email) {
    return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
  }

  const customerId = await getOrCreateStripeCustomer(user.id, user.email, user.name);

  const priceId = plan === "pro" ? STRIPE_PRICES.pro_monthly : STRIPE_PRICES.school_monthly;

  if (!priceId) {
    return NextResponse.json(
      { error: "لم يتم تهيئة نظام الدفع بعد. تواصل مع الدعم." },
      { status: 503 }
    );
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard/billing?success=1`,
    cancel_url: `${baseUrl}/dashboard/billing?canceled=1`,
    metadata: { userId: user.id, plan },
    subscription_data: { metadata: { userId: user.id, plan } },
    locale: "auto",
  });

  return NextResponse.json({ url: session.url });
}
