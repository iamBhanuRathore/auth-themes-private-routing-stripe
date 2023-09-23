"use client";
import React, { FormEvent } from "react";
import { FormSubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import User from "@/models/user";
import { getCurrentUser } from "@/lib/sesssion";

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
    console.log("Till the api");

    // Get a Stripe session URL.
    try {
      const { data } = await axios.post("/api/users/stripe", {
        userId,
        email,
        stripePriceId,
        stripeCustomerId,
        isSubscribed,
        isCurrentPlan,
      });
      if (data) {
        window.location.href = data.url;
      }
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
  }
  return (
    <form onSubmit={onSubmit}>
      <Button>{isCurrentPlan ? "Manage Subscription" : "Subscribe"}</Button>
    </form>
  );
};

export default ManageUserSubscriptionButton;
