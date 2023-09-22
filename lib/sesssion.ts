import { getServerSession } from "next-auth/next";

import { authOption } from "./auth";
import { User } from "@/typings";

export async function getCurrentUser() {
  const session = await getServerSession(authOption);

  return session?.user as User;
}
