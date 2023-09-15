import { redirect } from "next/navigation"  
import { getCurrentUser } from "@/lib/sesssion"
import { authOption } from '@/lib/auth';
import { DashboardShell } from "@/components/Dashboard/DashboardShell";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import {PostCreateButton} from "@/components/Dashboard/PostCreateButton"
const Dashboard = async () => {
    const user = await getCurrentUser()

    if (!user) {
      redirect(authOption?.pages?.signIn || "/login")
    }
    const posts =[];
    return (
        <DashboardShell>
                 <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton /> 
      </DashboardHeader>
            Dashboard
        </DashboardShell>
    )
}

export default Dashboard;
