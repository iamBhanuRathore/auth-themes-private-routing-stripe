import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";
export const env = createEnv({
  // !! This is used Only in the Development
  server: {
    GOOGLE_CLIENT_ID: z.string().min(5),
    GOOGLE_CLIENT_SECRET: z.string().min(5),
    GITHUB_CLIENT_ID: z.string().min(5),
    GITHUB_CLIENT_SECRET: z.string().min(5),
    GITHUB_CLIENT_ID: z.string().min(5),
    GITHUB_CLIENT_SECRET: z.string().min(5),
    NETLIFY_CLIENT_ID: z.string().min(5),
    NETLIFY_CLIENT_SECRET: z.string().min(5),
    MONGODB_URI: z.string().min(5),
    NEXTAUTH_URL: z.string().min(5),
    NEXT_PUBLIC_APP_URL: z.string().min(5),
    NEXTAUTH_URL_INTERNAL: z.string().min(5),
    NEXTAUTH_SECRET: z.string().min(5),
    STRIPE_PUBLISHABLE_KEY: z.string().min(5),
    NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_PRO: z.string().min(5),
    NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_GOLD: z.string().min(5),
    NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_PREMIUM: z.string().min(5),
    STRIPE_SECRET_KEY: z.string().min(5),
    STRIPE_WEBHOOK_SECRET: z.string().min(5),
  },
  runtimeEnv: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NETLIFY_CLIENT_ID: process.env.NETLIFY_CLIENT_ID,
    NETLIFY_CLIENT_SECRET: process.env.NETLIFY_CLIENT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_PRO:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_PRO,
    NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_GOLD:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_GOLD,
    NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_PREMIUM:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID_PREMIUM,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
});
