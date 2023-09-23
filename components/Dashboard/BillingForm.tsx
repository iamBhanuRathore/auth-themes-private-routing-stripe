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
import { getCurrentUser } from "@/lib/sesssion";
import newUser from "@/models/user";
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
          You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{subscriptionPlan.description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        <div className="grid grid-cols-2 gap-5">
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
                    isSubscribed={!!subscriptionPlan.isPro}
                    isCurrentPlan={subscriptionPlan.name == plan.name}
                  />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
