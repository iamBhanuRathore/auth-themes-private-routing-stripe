import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { authOption } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import Post from "@/models/post";
// import { getUserSubscriptionPlan } from "@/lib/subscription";
const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export async function POST() {
  try {
    await connectToDB();
    const session = await getServerSession(authOption);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const posts = await Post.find({
      authorId: user?.id,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response("Error Ocured", { status: 500 });
  }
}
