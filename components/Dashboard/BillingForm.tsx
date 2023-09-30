import * as React from "react";
import { User, UserSubscriptionPlan } from "@/typings";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allPlans } from "@/config/subscriptions";
import ManageUserSubscriptionButton from "./ManageUserSubscriptionButton";
import { formatDate } from "@/lib/utils";
interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan;
  user: User;
}

export async function BillingForm({
  subscriptionPlan,
  user,
}: BillingFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          You are currently on the <strong>{subscriptionPlan.plan.name}</strong>{" "}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{subscriptionPlan.description}</CardContent>
      <div className="md:grid grid-cols-2 gap-5 p-5">
        {allPlans.map((plan, index) => {
          if (!index) return;
          return (
            <Card key={plan.name}>
              <CardHeader>
                <CardTitle>{plan.name} Plan</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <ManageUserSubscriptionButton
                  userId={user?.id}
                  email={user?.email}
                  stripePriceId={plan.stripePriceId}
                  stripeCustomerId={subscriptionPlan.stripeCustomerId}
                  isSubscribed={subscriptionPlan.isSubscribed}
                  isCurrentPlan={subscriptionPlan.plan.name === plan.name}
                />
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {subscriptionPlan.stripeCurrentPeriodEnd && (
        <p className="rounded-full font-medium p-3 pt-0 text-right">
          {(subscriptionPlan?.isCanceled
            ? "Your plan will be canceled on "
            : "Your plan renews on ") +
            formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}
        </p>
      )}
    </Card>
  );
}
