import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-04-22.dahlia",
});

// Price IDs — set these in your Stripe dashboard and add to .env
export const STRIPE_PRICES = {
  pro_monthly: process.env.STRIPE_PRO_PRICE_ID ?? "",
  school_monthly: process.env.STRIPE_SCHOOL_PRICE_ID ?? "",
} as const;

export const PLAN_LIMITS = {
  FREE: { reportsPerMonth: 3, storageBytes: 0 },
  PRO: { reportsPerMonth: Infinity, storageBytes: 100 * 1024 * 1024 },
  SCHOOL_ADMIN: { reportsPerMonth: Infinity, storageBytes: 1024 * 1024 * 1024 },
  SUPER_ADMIN: { reportsPerMonth: Infinity, storageBytes: Infinity },
} as const;

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name: string | null
): Promise<string> {
  const { db } = await import("@/lib/db");
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  });

  if (user?.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({
    email,
    name: name ?? undefined,
    metadata: { userId },
  });

  await db.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}
