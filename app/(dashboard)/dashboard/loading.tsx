import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { PostCreateButton } from "@/components/Dashboard/PostCreateButton"
import { PostItem } from "@/components/Dashboard/PostItem"
import { DashboardShell } from "@/components/Dashboard/DashboardShell"

export default function DashboardLoading() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Posts" text="Create and manage posts.">
                <PostCreateButton />
            </DashboardHeader>
            <div className="divide-border-200 divide-y rounded-md border">
                <PostItem.Skeleton />
                <PostItem.Skeleton />
                <PostItem.Skeleton />
                <PostItem.Skeleton />
                <PostItem.Skeleton />
            </div>
        </DashboardShell>
    )
}
