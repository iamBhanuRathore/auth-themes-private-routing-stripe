"use client";
import React, { FormEvent } from "react";
import { FormSubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";

const ManageUserSubscriptionButton = ({
  userId,
  email,
  stripePriceId,
  stripeCustomerId,
  isSubscribed,
  isCurrentPlan,
}: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe");

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json();
    if (session) {
      window.location.href = session.url;
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Button>{isCurrentPlan ? "Manage Subscription" : "Subscribe"}</Button>
    </form>
  );
};

export default ManageUserSubscriptionButton;
