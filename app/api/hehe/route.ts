import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import * as z from "zod";
import { authOption } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import Post from "@/models/post";
const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectToDB();
    const session = await getServerSession(authOption);
    console.log({ session });
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const { user } = session;
    // const posts = await Post.find({
    //   // authorId: user.id,
    // });
    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (error) {
    return new Response("Error " + error, { status: 401 });
  }
}
