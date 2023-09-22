import * as z from "zod";

import { authOption } from "@/lib/auth";
import { postPatchSchema } from "@/lib/validations/post";
import { signOut } from "next-auth/react";
import Post from "@/models/post";
import { getCurrentUser } from "@/lib/sesssion";
import { connectToDB } from "@/lib/db";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);
    console.log(1);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response("Verification Error", { status: 403 });
    }
    console.log(2);

    // Get the request body and validate it.
    const json = await req.json();
    const { content, title } = postPatchSchema.parse(json);

    await Post.findByIdAndUpdate(params.postId, {
      title: title,
      content: content,
    });
    console.log(3);

    return new Response("Updateed Successfully", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const user = await getCurrentUser();
  console.log(4);

  if (!user) {
    console.log("Signing Out");
    return signOut();
  }
  try {
    await connectToDB();
    // Query the database to find a post with the given postId and authorId
    const post = await Post.findOne({ _id: postId, authorId: user.id });
    console.log(5);

    // If a post is found, the user has access
    return !!post;
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error verifying access to post:", error);
    return false;
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 });
    }

    // Delete the post.
    await Post.deleteOne({ _id: params.postId });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
