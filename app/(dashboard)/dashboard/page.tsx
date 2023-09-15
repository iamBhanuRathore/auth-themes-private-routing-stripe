import { redirect } from "next/navigation"  
import { getCurrentUser } from "@/lib/sesssion"
import { authOption } from '@/lib/auth';
const Dashboard = async () => {
    return (
        <DashboardShel>
            Dashboard
        </DashboardShel>
    )
}

export default Dashboard
