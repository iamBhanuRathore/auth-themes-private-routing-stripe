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

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex w-full flex-1 flex-col min-h-[500px]">
      <Card className="w-3/4 lg:w-1/2 m-auto">
        <CardHeader>
          <CardTitle>This is a Client Side Page </CardTitle>
          <CardDescription>
            This page is Protected By the Client Side. Only user who are logged
            in can access this Page
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
