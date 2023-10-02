import * as Icons from "lucide-react";

export type User = {
  name: string;
  email: string;
  id: string;
  image: string;
};
export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons | "ArrowRight";
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
  numberOfPosts: number;
  price: number;
};
type SubscriptionPlans = SubscriptionPlan[];

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
    plan: SubscriptionPlan;
    isSubscribed: boolean;
    isCanceled: boolean;
  };
export type Post = {
  id: string;
  title: String;
  content: any;
  published: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: String;
};

// editorjs-header.d.ts

// declare module "@editorjs/header" {
//   import {
//     ToolConstructable,
//     BaseTool,
//     BlockTune,
//     SanitizerConfig,
//   } from "@editorjs/editorjs";

//   export interface HeaderData {
//     text: string;
//     level: number;
//   }

//   export class Header extends BaseTool {
//     constructor(data: HeaderData, config?: { [key: string]: any });
//   }
// }

// // editorjs-embed.d.ts

// declare module "@editorjs/embed" {
//   import {
//     ToolConstructable,
//     BaseTool,
//     BlockTune,
//     SanitizerConfig,
//   } from "@editorjs/editorjs";

//   export interface EmbedData {
//     service: string;
//     source: string;
//     embed: string;
//   }

//   export class Embed extends BaseTool {
//     constructor(data: EmbedData, config?: { [key: string]: any });
//   }
// }

// // editorjs-table.d.ts

// declare module "@editorjs/table" {
//   import {
//     ToolConstructable,
//     BaseTool,
//     BlockTune,
//     SanitizerConfig,
//   } from "@editorjs/editorjs";

//   export interface TableData {
//     content: string[][];
//   }

//   export class Table extends BaseTool {
//     constructor(data: TableData, config?: { [key: string]: any });
//   }
// }

// // editorjs-code.d.ts

// declare module "@editorjs/code" {
//   import {
//     ToolConstructable,
//     BaseTool,
//     BlockTune,
//     SanitizerConfig,
//   } from "@editorjs/editorjs";

//   export interface CodeData {
//     code: string;
//   }

//   export class Code extends BaseTool {
//     constructor(data: CodeData, config?: { [key: string]: any });
//   }
// }

// // editorjs-link.d.ts

// declare module "@editorjs/link" {
//   import {
//     ToolConstructable,
//     BaseTool,
//     BlockTune,
//     SanitizerConfig,
//   } from "@editorjs/editorjs";

//   export interface LinkData {
//     link: string;
//     meta?: {
//       title?: string;
//       description?: string;
//       image?: string;
//     };
//   }

//   export class LinkTool extends BaseTool {
//     constructor(data: LinkData, config?: { [key: string]: any });
//   }
// }

// // editorjs-inline-code.d.ts

// declare module "@editorjs/inline-code" {
//   import {
//     ToolConstructable,
//     BaseTool,
//     BlockTune,
//     SanitizerConfig,
//   } from "@editorjs/editorjs";

//   export interface InlineCodeData {
//     code: string;
//   }

//   export class InlineCode extends BaseTool {
//     constructor(data: InlineCodeData, config?: { [key: string]: any });
//   }
// }
