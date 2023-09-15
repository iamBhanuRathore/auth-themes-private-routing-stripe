import { DashboardConfig } from "@/typings";

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Documentation",
            href: "/docs",
        },
        {
            title: "Support",
            href: "/support",
            disabled: true,
        },
    ],
    sidebarNav: [
        {
            title: "Posts",
            href: "/dashboard",
            icon: "FileText",
        },
        {
            title: "Billing",
            href: "/dashboard/billing",
            icon: "CreditCard",
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: "Settings",
        },
    ],
}
