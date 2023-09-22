// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { UserSubscriptionPlan } from "@/typings";
import { allPlans, freePlan } from "@/config/subscriptions";
import User from "@/models/user";
import { connectToDB } from "../db";
import { getCurrentUser } from "../sesssion";
import { redirect } from "next/navigation";
import { stripe } from "../stripe";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  // const user = getCurrentUser();

  // if (!user) {
  //   redirect(authOption?.pages?.signIn || "/login");
  // }
  await connectToDB();
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    return null;
  }
  // Check if user is on a pro plan.
  // const isPro =
  //   user.stripePriceId &&
  //   user.stripeCurrentPeriodEnd &&
  //   user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();
  const isSubscribed =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd?.getTime() + 86400000 > Date.now();
  // const plan = isPro ? proPlan : freePlan;
  // console.log("Subscription", user, plan, isPro);
  const plan = isSubscribed
    ? allPlans.map((p) => p.stripePriceId === user.stripePriceId)
    : freePlan;
  let isCanceled = false;
  if (isSubscribed && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }
  return {
    ...plan,
    ...user,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isSubscribed,
    isCanceled,
  };
}

// cpyadav6815@gmail.com
// pes@12345
