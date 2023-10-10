import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DashboardShell } from "@/components/Dashboard/DashboardShell";
import { UserNameForm } from "@/components/Dashboard/UserNameForm";
import { UserUpdatePassword } from "@/components/Dashboard/UserUpdatePassword";
import { authOption } from "@/lib/auth";
import { getCurrentUser } from "@/lib/sesssion";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOption?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <UserUpdatePassword user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  );
}
