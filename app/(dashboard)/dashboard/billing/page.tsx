import { redirect } from "next/navigation";

import { authOption } from "@/lib/auth";
import { getCurrentUser } from "@/lib/sesssion";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/validations/subscription";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";

// import { BillingForm } from "@/components/billing-form";
import * as Icons from "lucide-react";
import { DashboardShell } from "@/components/Dashboard/DashboardShell";
import { BillingForm } from "@/components/Dashboard/BillingForm";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};
const Billing = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOption?.pages?.signIn || "/login");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.AlertTriangle />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Taxonomy app is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </DashboardShell>
  );
};

export default Billing;
