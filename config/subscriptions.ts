import { SubscriptionPlan, SubscriptionPlans } from "@/typings";
import { env } from "@/env.mjs";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 2 posts. Upgrade to the Premium plan for unlimited posts.",
  stripePriceId: "",
  numberOfPosts: 2,
  price: 0,
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description:
    "The Pro plan is limited to 4 posts. Upgrade to the Premium plan for unlimited posts.",
  stripePriceId: env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_PRO || "",
  numberOfPosts: 4,
  price: 1,
};

export const goldPlan: SubscriptionPlan = {
  name: "Gold",
  description:
    "The Gold plan is limited to 6 posts. Upgrade to the Premium plan for unlimited posts.",
  stripePriceId: env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_GOLD || "",
  numberOfPosts: 6,
  price: 2,
};

export const premiumPlan: SubscriptionPlan = {
  name: "PREMIUM",
  description: "The Premium plan has unlimited posts.",
  stripePriceId: env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_PREMIUM || "",
  numberOfPosts: Infinity,
  price: 3,
};

export const allPlans: SubscriptionPlans = [
  freePlan,
  proPlan,
  goldPlan,
  premiumPlan,
];
