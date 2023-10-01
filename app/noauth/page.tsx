"use client";

import Codefile from "@/components/CodeBlocks/Codefile";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function Billing() {
  const { data: session } = useSession();
  return (
    <div className="flex w-full flex-1 flex-col min-h-[500px]">
      <Card className="w-1/2 m-auto bg-primary-2">
        <CardHeader>
          <CardTitle>This is a Client Side Page </CardTitle>
          <CardDescription>
            This page is not Protected by Anybody can access this page
            regardless they are log in or log out
          </CardDescription>
          <CardDescription className="">
            <Codefile user={session} />
          </CardDescription>
        </CardHeader>
        <CardFooter>
          This Page is faster Initial load and also can be as same as React this
          whole page will same work as the react app
        </CardFooter>
      </Card>
    </div>
  );
}
