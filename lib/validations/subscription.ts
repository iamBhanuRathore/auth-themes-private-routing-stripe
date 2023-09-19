// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { UserSubscriptionPlan } from "@/typings";
import { freePlan, proPlan } from "@/config/subscriptions";
import User from "@/models/user";
import { connectToDB } from "../db";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  await connectToDB();
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  };
}

// cpyadav6815@gmail.com
// pes@12345
