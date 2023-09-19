import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/sesssion";
import { authOption } from "@/lib/auth";
import { DashboardShell } from "@/components/Dashboard/DashboardShell";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { PostCreateButton } from "@/components/Dashboard/PostCreateButton";
import { PostItem } from "@/components/Dashboard/PostItem";
import { EmptyPlaceholder } from "@/components/Dashboard/EmptyPlaceholder";
import axios from "axios";
import { getServerSession } from "next-auth";
import Post from "@/models/post";
const Dashboard = async () => {
  const user = await getCurrentUser();
  // console.log(user);
  if (!user) {
    redirect(authOption?.pages?.signIn || "/login");
  }
  // !! Need to update the static post array to the Database Pposts
  const posts = await Post.find({
    authorId: user?.id,
  });
  // const posts: any[] = [1, 2];

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            {/* <EmptyPlaceholder.Icon name="post" /> */}
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
};

export default Dashboard;
