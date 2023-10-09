import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/sesssion";
import Codefile from "@/components/CodeBlocks/Codefile";
const ServerPage = async () => {
  const user = await getCurrentUser();
  return (
    <div className="flex w-full flex-1 flex-col min-h-[500px]">
      <Card className="w-3/4 lg:w-1/2 m-auto">
        <CardHeader>
          <CardTitle>This is a Server Page </CardTitle>
          <CardDescription>
            This page is Protected By the Server. Only user who are logged in
            can access this Page
          </CardDescription>
          <CardDescription className="">
            <Codefile user={user} />
          </CardDescription>
        </CardHeader>
        <CardFooter>This Data is coming from the Server</CardFooter>
      </Card>
    </div>
  );
};

export default ServerPage;
