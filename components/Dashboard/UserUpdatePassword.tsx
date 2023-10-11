"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import * as Icons from "lucide-react";
import { User } from "@/typings";
import { userPasswordSchema } from "@/lib/validations/user";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">;
}

type FormData = z.infer<typeof userPasswordSchema>;

export function UserUpdatePassword({
  user,
  className,
  ...props
}: UserNameFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userPasswordSchema),
    defaultValues: {
      // name: user?.name || "",
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isShown, setIsShown] = React.useState<boolean>(false);
  // @ts-ignore
  if (errors?.matchPassword?.message) {
    toast({
      title: "Wrong Password", // @ts-ignore
      description: errors?.matchPassword?.message,
      type: "foreground",
      color: "error",
      variant: "destructive",
    });
    reset();
  }

  async function onSubmit(data: FormData) {
    const result = userPasswordSchema.safeParse(data);
    console.log({ data, result });
    setIsSaving(true);
    const response = await fetch(`/api/users/${user.id}/updatepassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Your Password has been updated.",
    });
    reset();
    setIsShown(false);
    router.refresh();
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            If you want to update the Password Click on Update Password Button.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-5">
          {isShown && (
            <>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  Password
                </Label>
                <Input
                  id="name"
                  className="w-[400px]"
                  size={32}
                  placeholder="New Password"
                  {...register("password")}
                />
                {errors?.password && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  Confirm Password
                </Label>
                <Input
                  id="name"
                  className="w-[400px]"
                  placeholder="Confirm New Password"
                  size={32}
                  {...register("confirmPassword")}
                />
                {errors?.confirmPassword && (
                  <span className="px-1 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          {!isShown && (
            <button
              type="button"
              onClick={() => setIsShown(true)}
              className={cn(buttonVariants(), className)}>
              <span>Update Old Password</span>
            </button>
          )}

          {isShown && (
            <button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}>
              {isSaving && (
                <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Reset Password</span>
            </button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
