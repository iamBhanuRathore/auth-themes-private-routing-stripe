// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { allPlans, freePlan } from "@/config/subscriptions";
import User from "@/models/user";
import { connectToDB } from "../db";
import { stripe } from "../stripe";

export async function getUserSubscriptionPlan(userId: string): Promise<any> {
  await connectToDB();
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    return null;
  }
  // console.log({ user });

  const isSubscribed =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd?.getTime() + 86400000 > Date.now();
  // const plan = isPro ? proPlan : freePlan;
  // console.log("Subscription", user, plan, isPro);
  const plan = isSubscribed
    ? allPlans.filter((p) => {
        if (p.stripePriceId === user.stripePriceId) {
          return p;
        }
      })[0]
    : freePlan;
  let isCanceled = false;
  // console.log({ user });
  if (isSubscribed && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );
    // console.log({ stripePlan });
    isCanceled = stripePlan.cancel_at_period_end;
  }
  return {
    plan,
    ...user,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}

// cpyadav6815@gmail.com
// pes@12345
