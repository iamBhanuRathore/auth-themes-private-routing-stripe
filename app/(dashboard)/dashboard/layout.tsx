import { getCurrentUser } from "@/lib/sesssion";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import { dashboardConfig } from "@/config/dashboard";

export async function generateMetadata() {
  const user = await getCurrentUser();
  const name = user?.name;
  return {
    title: "Dashboard | " + name,
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container bg-primary-1 grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </main>
    </>
  );
}
