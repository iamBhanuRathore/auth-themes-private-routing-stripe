import { env } from "@/env.mjs";
import { connectToDB } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import User from "@/models/user";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  // console.log({ body });

  const signature = headers().get("Stripe-Signature") ?? "";
  console.log("Webhook Called");

  let event: Stripe.Event;
  try {
    // console.log({
    //   body,
    //   signature,
    //   STRIPE_WEBHOOK_SECRET: env.STRIPE_WEBHOOK_SECRET,
    // });
    console.log("Webhook Started");
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET || ""
    );
    console.log("stripe.webhooks.constructEvent");
  } catch (error) {
    console.log("stripe.webhooks.constructEvent Error", JSON.stringify(error));
    return new Response(
      `Webhook Error`,
      // `Webhook Error: ${
      //   error instanceof Error ? error.message : "Unknown Error"
      // }`,
      {
        status: 400,
      }
    );
  }
  const session = event.data.object as Stripe.Checkout.Session;
  // console.log({ session });
  if (!session.metadata?.userId) {
    console.log("session.metadata?.userId");
    return new Response(null, { status: 200 });
  }
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    // console.log({ subscription });
    console.log("checkout.session.completed");

    await connectToDB();
    await User.findByIdAndUpdate(session.metadata.userId, {
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  }
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    // console.log({ subscription });
    console.log("invoice.payment_succeeded");
    await connectToDB();
    await User.findByIdAndUpdate(session.metadata.userId, {
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
    return new Response(null, { status: 200 });
  }
}
