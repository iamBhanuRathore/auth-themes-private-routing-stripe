import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NetlifyProvider from "next-auth/providers/netlify";
import AppleProvider from "next-auth/providers/apple";
import Auth0 from "next-auth/providers/auth0";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import LinkedInProvider from "next-auth/providers/linkedin";
import SpotifyProvider from "next-auth/providers/spotify";
import { env } from "@/env.mjs";
import Account from "@/models/accounts";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { connectToDB } from "./db";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "text",
          label: "Email",
          placeholder: "joe@example",
        },
        username: {
          type: "text",
          label: "Username",
          placeholder: "Joe Smith",
        },
        password: {
          type: "text",
          label: "Password",
          placeholder: "pass****",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing Credentials");
        }
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No User Found for credentials");
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isMatch) {
          throw new Error("No User Found for credentials");
        }
        return user;
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // AppleProvider({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    // Auth0({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    // FacebookProvider({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    // InstagramProvider({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    // LinkedInProvider({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    // SpotifyProvider({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    // NetlifyProvider({
    //   clientId: "",
    //   clientSecret: "",
    // }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      //   // if (!sessionUser) {
      //   //   const newUser = await User.create({
      //   //     name: session?.user?.name,
      //   //     email: session?.user?.email,
      //   //   });
      //   // }
      //   // if (!sessionUser) {
      //   //   console.log("Not found", session);
      //   // }
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }
      console.log("Session", session);
      return session;
    },
    async signIn({ user, account, profile, credentials }) {
      console.log({ user, account, profile, credentials });
      try {
        await connectToDB();

        // Check if the user already exists based on the providerAccountId
        const existingAccount = await Account.findOne({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        if (!existingAccount) {
          // Create a new user account associated with the provider
          await Account.create({
            userId: user._id, // Link the account to the user
            type: "oauth", // or the appropriate type
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            // Store any other relevant information from the provider, e.g., access_token, id_token, etc.
          });
        }

        return true;
      } catch (error) {
        console.log("Error Occurred while Sign In", error);
        return false;
      }
    },
  },
  secret: env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  // debug: process.env.NODE_ENV === "development",
};
