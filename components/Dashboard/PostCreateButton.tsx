"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import * as Icons from "lucide-react";

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
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New One",
        }),
      });
      const data = await response.json();
      setIsLoading(false);
      console.log({ data });

      if (!response?.ok) {
        if (response.status === 403) {
          return toast({
            title: data.message,
            description: "Please upgrade to the Premium plan.",
            variant: "destructive",
          });
        }
        if (response.status === 402) {
          return toast({
            title: "Limit of 3 posts reached.",
            description: "Please upgrade to the PRO plan.",
            variant: "destructive",
          });
        }
        toast({
          title: "Something went wrong.",
          description: "Your post was not created. Please try again.",
          variant: "destructive",
        });
      }

      const post = await response.json();

      // Todo - This forces a cache invalidation.
      router.refresh();

      router.push(`/editor/${post._id}`);
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Internal Server Error"
      );
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
