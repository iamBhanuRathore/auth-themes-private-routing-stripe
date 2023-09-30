"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import * as Icons from "lucide-react";
import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);
    try {
      const { data, status } = await axios.post("/api/posts", {
        title: "New One",
      });
      console.log({ data, status });

      // Todo - This forces a cache invalidation.
      router.refresh();
      router.push(`/editor/${data._id}`);
    } catch (error: any) {
      console.log(error.response);
      if (error.response.status === 403) {
        return toast({
          title: "Alert",
          description: error.response.data.message,
          variant: "destructive",
        });
      }
      if (error.response.status === 422) {
        await signOut();
        return toast({
          title: "Alert",
          description: error.response.data.message,
          variant: "destructive",
        });
      }
      console.log(
        error instanceof Error ? error.message : "Internal Server Error"
      );
      console.log("In Catch Block Error");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.Plus className="mr-2 h-4 w-4" />
      )}
      New post
    </button>
  );
}
