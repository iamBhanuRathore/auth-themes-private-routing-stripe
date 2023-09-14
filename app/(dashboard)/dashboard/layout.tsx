import type { Metadata } from "next";
// import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/sesssion";
import { SiteFooter } from "@/components/Footer/SiteFooter";

export async function generateMetadata() {
    const user = await getCurrentUser();
    const name = user?.name
    return {
        title: "Dashboard | " + name,
    }
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <main className="bg-primary-1 grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <p>HEHE</p>
                    {/* <DashboardNav items={dashboardConfig.sidebarNav} /> */}
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </main>
            <SiteFooter />
        </>
    );
}