import { notFound, redirect } from "next/navigation";
import { authOption } from "@/lib/auth";
import { getCurrentUser } from "@/lib/sesssion";
// import { Editor } from "@/components/editor";
import Post from "@/models/post";
import { connectToDB } from "@/lib/db";
import { Editor } from "@/components/Dashboard/Editor";

async function getPostForUser(postId: any, userId: any) {
  try {
    await connectToDB();
    return await Post.findOne({
      _id: postId,
      authorId: userId,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

interface EditorPageProps {
  params: { postId: string };
}
export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOption?.pages?.signIn || "/login");
  }
  console.log({ params });

  const post = await getPostForUser(params.postId, user.id);
  console.log({ post });
  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
}

// ns-1072.awsdns-06.org
// ns-855.awsdns-42.net
// ns-184.awsdns-23.com
// ns-1556.awsdns-02.co.uk
