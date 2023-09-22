import { z } from "zod";
import { absoluteUrl } from "@/lib/utils";
import { getCurrentUser } from "@/lib/sesssion";
import { getUserSubscriptionPlan } from "@/lib/validations/subscription";

const billingUrl = absoluteUrl("/dashboard/billing");

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user || !user.email) {
      return new Response(null, { status: 403 });
    }
    const {
      isPro,
      stripeCurrentPeriodEnd,
      stripeCustomerId,
      stripeSubscriptionId,
      stripePriceId,
    } = await getUserSubscriptionPlan(user.id);
    console.log({
      isPro,
      stripeCurrentPeriodEnd,
      stripeCustomerId,
      stripeSubscriptionId,
      stripePriceId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
