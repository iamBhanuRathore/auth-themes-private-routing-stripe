import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { authOption } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import Post from "@/models/post";
import { getCurrentUser } from "@/lib/sesssion";
import { getUserSubscriptionPlan } from "@/lib/validations/subscription";
import { log } from "console";
// import { getUserSubscriptionPlan } from "@/lib/subscription";
const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    // const session = await getServerSession(authOption);

    if (!user) {
      return new Response("Unauthorized", { status: 403 });
    }

    // const { user } = session;
    const count = await Post.count({ authorId: user.id });
    const { plan } = await getUserSubscriptionPlan(user.id);

    console.log({ count });
    if (count >= plan.numberOfPosts) {
      return new Response(
        JSON.stringify({
          message: `Maximum Posts (${plan.numberOfPosts}) reached , Upgrade Plan`,
          success: false,
        }),
        {
          status: 403,
        }
      );
    }
    const json = await req.json();
    const { title, content } = postCreateSchema.parse(json);
    const posts = await Post.create({
      authorId: user?.id,
      title,
      content,
    });
    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response("Error Ocured", { status: 500 });
  }
}
