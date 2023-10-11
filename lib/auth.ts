import { NextAuthOptions } from "next-auth";
import { env } from "@/env.mjs";
import Account from "@/models/accounts";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { connectToDB } from "./db";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NetlifyProvider from "next-auth/providers/netlify";

export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
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
        console.log("credentials", { credentials });
        try {
          await connectToDB();
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing Credentials");
          }
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return new Response(
              JSON.stringify({ message: "No User Found for credentials" }),
              { status: 404 }
            );
            // throw new Error("No User Found for credentials");
          }
          if (user.hashedPassword === "Logged In Throught Providers") {
            console.log("Authentication Failed");
            // throw new Error("Login Via Social Accounts");
            return new Response(
              JSON.stringify({ message: "Login Via Social Accounts" }),
              { status: 402 }
            );
          }
          const isMatch = bcrypt.compareSync(
            credentials.password,
            user.hashedPassword
          );
          if (!isMatch) {
            // throw new Error("Wrong Password");
            return new Response(JSON.stringify({ message: "Wrong Password" }), {
              status: 402,
            });
          }
          return user;
        } catch (error: any) {
          console.error("Authentication Error:", error.message);
          throw error;
        }
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
    NetlifyProvider({
      clientId: env.NETLIFY_CLIENT_ID,
      clientSecret: env.NETLIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      console.log("Session Called");
      if (token.id) {
        session.user.id = token.id;
      }
      // console.log({ session });
      // await connectToDB();
      // const sessionUser = await User.findOne({
      //   email: session?.user?.email,
      // });
      // session.user.id = sessionUser._id.toString();
      // console.log("Session", sessionUser);
      return session;
    },
    async signIn({ user, account, profile, credentials }: any) {
      // console.log({ user, account, profile, credentials });
      console.log("Sign In  Called");
      if (account.provider !== "credentials") {
        try {
          await connectToDB();
          const existUser = await User.findOne({
            email: user.email,
          });
          // console.log({ user: existUser })
          if (existUser) {
            // Check if the user already exists based on the providerAccountId
            const existAccount = await Account.findOne({
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            });
            // console.log({ account: existAccount })
            if (existAccount) {
              return true;
            } else {
              await Account.create({
                userId: existUser._id, // Link the account to the user
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                id_token: account.id_token,
                token_type: account.token_type,
                access_token: account.access_token,
                type: account.type,
              });
              return true;
            }
          } else {
            // return true;
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              emailVerified: true,
              image: user.image,
              hashedPassword: "Logged In Through Providers",
              stripeCustomerId: "",
              stripeSubscriptionId: "",
            });
            await Account.create({
              userId: newUser._id, // Link the account to the user
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              id_token: account.id_token,
              token_type: account.token_type,
              access_token: account.access_token,
              type: account.type,
            });
            return true;
          }
        } catch (error) {
          console.log("Error Occurred while Sign In", error);
          return false;
        }
      }
      if (account.provider === "credentials") {
        // console.log({ user, account, profile, credentials });
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      await connectToDB();
      const dbUser = await User.findOne({
        email: token.email,
      });
      console.log({ dbUser, user: JSON.stringify(user), token });
      console.log("JWT is Called");
      return {
        ...token,
        id: dbUser._id.toString(),
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    // async jwt({ token, user }) {
    //   console.log("User", token, JSON.stringify(user));
    //   // const isSignIn = user ? true : false;
    //   // if (isSignIn) {
    //   //   token.username = user.username;
    //   //   token.password = user.password;
    //   // }
    //   return token;
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log({ url, baseUrl });
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // debug: process.env.NODE_ENV === "development",
};
