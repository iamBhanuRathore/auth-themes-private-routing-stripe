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
      console.log("Hello", stripeSession);

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
    console.log(JSON.stringify(error));

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

const a = {
  type: "StripeInvalidRequestError",
  raw: {
    message:
      "You can’t create a portal session in test mode until you save your customer portal settings in test mode at https://dashboard.stripe.com/test/settings/billing/portal.",
    request_log_url:
      "https://dashboard.stripe.com/test/logs/req_3VFnwI27alOMuf?t=1695839896",
    type: "invalid_request_error",
    headers: {
      server: "nginx",
      date: "Wed, 27 Sep 2023 18:38:16 GMT",
      "content-type": "application/json",
      "content-length": "341",
      connection: "keep-alive",
      "access-control-allow-credentials": "true",
      "access-control-allow-methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "access-control-allow-origin": "*",
      "access-control-expose-headers":
        "Request-Id, Stripe-Manage-Version, X-Stripe-External-Auth-Required, X-Stripe-Privileged-Session-Required",
      "access-control-max-age": "300",
      "cache-control": "no-cache, no-store",
      "content-security-policy":
        "report-uri /csp-report?p=%2Fv1%2Fbilling_portal%2Fsessions;block-all-mixed-content;default-src 'none' 'report-sample';base-uri 'none';form-action 'none';style-src 'unsafe-inline';frame-ancestors 'self';connect-src 'self';img-src 'self' https://b.stripecdn.com",
      "content-security-policy-report-only":
        "report-uri /csp-report?p=v1%2Fbilling_portal%2Fsessions; block-all-mixed-content; default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; img-src 'self'; script-src 'self' 'report-sample'; style-src 'self'",
      "idempotency-key":
        "stripe-node-retry-7cedce4a-c32e-4c03-ba03-75f9ac7758ec",
      "original-request": "req_3VFnwI27alOMuf",
      "request-id": "req_3VFnwI27alOMuf",
      "stripe-should-retry": "false",
      "stripe-version": "2023-08-16",
      vary: "Origin",
      "x-stripe-routing-context-priority-tier": "api-testmode",
      "strict-transport-security":
        "max-age=63072000; includeSubDomains; preload",
    },
    statusCode: 400,
    requestId: "req_3VFnwI27alOMuf",
  },
  rawType: "invalid_request_error",
  headers: {
    server: "nginx",
    date: "Wed, 27 Sep 2023 18:38:16 GMT",
    "content-type": "application/json",
    "content-length": "341",
    connection: "keep-alive",
    "access-control-allow-credentials": "true",
    "access-control-allow-methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "access-control-allow-origin": "*",
    "access-control-expose-headers":
      "Request-Id, Stripe-Manage-Version, X-Stripe-External-Auth-Required, X-Stripe-Privileged-Session-Required",
    "access-control-max-age": "300",
    "cache-control": "no-cache, no-store",
    "content-security-policy":
      "report-uri /csp-report?p=%2Fv1%2Fbilling_portal%2Fsessions;block-all-mixed-content;default-src 'none' 'report-sample';base-uri 'none';form-action 'none';style-src 'unsafe-inline';frame-ancestors 'self';connect-src 'self';img-src 'self' https://b.stripecdn.com",
    "content-security-policy-report-only":
      "report-uri /csp-report?p=v1%2Fbilling_portal%2Fsessions; block-all-mixed-content; default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; img-src 'self'; script-src 'self' 'report-sample'; style-src 'self'",
    "idempotency-key": "stripe-node-retry-7cedce4a-c32e-4c03-ba03-75f9ac7758ec",
    "original-request": "req_3VFnwI27alOMuf",
    "request-id": "req_3VFnwI27alOMuf",
    "stripe-should-retry": "false",
    "stripe-version": "2023-08-16",
    vary: "Origin",
    "x-stripe-routing-context-priority-tier": "api-testmode",
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
  },
  requestId: "req_3VFnwI27alOMuf",
  statusCode: 400,
};
