import { env } from "@/env.mjs";
import { connectToDB } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import User from "@/models/user";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.json();
  const signature = headers().get("Stripe-Signature") ?? "";
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : "Unknown Error"
      }`,
      {
        status: 400,
      }
    );
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (!session.metadata?.userId) {
    return new Response(null, { status: 200 });
  }
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    console.log({ subscription });

    await connectToDB();
    await User.findByIdAndUpdate(session.metadata.useId, {
      stripeCustomerId: subscription.id,
      stripeSubscriptionId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  }
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    console.log({ subscription });
    await connectToDB();
    await User.findByIdAndUpdate(session.metadata.useId, {
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
    return new Response(null, { status: 200 });
  }
}
