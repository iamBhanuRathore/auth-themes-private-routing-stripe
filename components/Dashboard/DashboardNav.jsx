// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import * as Icons from "lucide-react";
// import { SidebarNavItem } from "@/typings";

// interface DashboardNavProps {
//   items: SidebarNavItem[];
// }

// const DashboardNav = ({ items }: DashboardNavProps) => {
//   const path = usePathname();

//   if (!items?.length) {
//     return null;
//   }
//   return (
//     <nav className="grid items-start gap-2">
//       {items.map((item, index) => {
//         const Icon = Icons[item.icon || "ArrowRight"];
//         return (
//           item.href && (
//             <Link key={index} href={item.disabled ? "/" : item.href}>
//               <span
//                 className={cn(
//                   "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                   path === item.href ? "bg-accent" : "transparent",
//                   item.disabled && "cursor-not-allowed opacity-80"
//                 )}>
//                 <Icon className="mr-2 h-4 w-4" />
//                 <span>{item.title}</span>
//               </span>
//             </Link>
//           )
//         );
//       })}
//     </nav>
//   );
// };

// export default DashboardNav;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

const DashboardNav = ({ items }) => {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }
  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "ArrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export default DashboardNav;
