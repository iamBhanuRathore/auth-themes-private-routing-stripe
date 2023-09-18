import { notFound, redirect } from "next/navigation";

import { authOption } from "@/lib/auth";
import { getCurrentUser } from "@/lib/sesssion";
// import { Editor } from "@/components/editor";
import Post from "@/models/post";
import { connectToDB } from "@/lib/db";

async function getPostForUser(postId: any, userId: any) {
  await connectToDB();
  const a = await Post.findById(postId);
  if (!a) {
    return false;
  }
  console.log(a);
  return a;
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
  console.log(post);
  if (!post) {
    notFound();
  }

  return (
    <p>{JSON.stringify(post)}</p>
    // <Editor
    //   post={{
    //     id: post.id,
    //     title: post.title,
    //     content: post.content,
    //     published: post.published,
    //   }}
    // />
  );
}

// ns-1072.awsdns-06.org
// ns-855.awsdns-42.net
// ns-184.awsdns-23.com
// ns-1556.awsdns-02.co.uk
