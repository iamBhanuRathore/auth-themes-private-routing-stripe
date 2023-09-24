import { z } from "zod";
import { absoluteUrl } from "@/lib/utils";
import { getCurrentUser } from "@/lib/sesssion";
import { getUserSubscriptionPlan } from "@/lib/validations/subscription";
import { stripe } from "@/lib/stripe";

const billingUrl = absoluteUrl("/dashboard/billing");

export async function POST(req: Request) {
  try {
    const {
      userId,
      email,
      stripePriceId,
      stripeCustomerId,
      isSubscribed,
      isCurrentPlan,
    } = await req.json();

    if (!userId || !email) {
      return new Response(null, { status: 403 });
    }
    console.log(
      "Stripe Api is Called",
      userId,
      email,
      stripePriceId,
      stripeCustomerId,
      isSubscribed,
      isCurrentPlan
    );

    // const {
    //   stripeCurrentPeriodEnd,
    //   stripeCustomerId,
    //   stripeSubscriptionId,
    //   isSubscribed,
    //   isCurrentPlan,
    // } = await getUserSubscriptionPlan(user.id);
    // !! For the Manage Subscription , The user already have a subscription
    if (isSubscribed && stripeCustomerId && isCurrentPlan) {
      console.log("isSubscribed && stripeCustomerId && isCurrentPlan");
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: billingUrl,
      });
      return new Response(JSON.stringify({ url: stripeSession.url }), {
        status: 201,
      });
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: email,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
    });
    console.log("stripe.checkout.sessions.create");
    return new Response(
      JSON.stringify({
        url: stripeSession.url,
        message: "New StripeId is created",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(JSON.stringify(error), { status: 500 });
  }
}
