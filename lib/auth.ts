import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import NetlifyProvider from "next-auth/providers/netlify"
import AppleProvider from "next-auth/providers/apple"
import Auth0 from "next-auth/providers/auth0"
import FacebookProvider from "next-auth/providers/facebook"
import InstagramProvider from "next-auth/providers/instagram"
import LinkedInProvider from "next-auth/providers/linkedin"
import SpotifyProvider from "next-auth/providers/spotify"
import { env } from "@/env.mjs"
import User from "@/models/user"
import bcrypt from 'bcrypt';


export const authOption: NextAuthOptions = {
    adapter: {},
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    type: "text",
                    label: "Email",
                    placeholder: "joe@example"
                },
                username: {
                    type: "text",
                    label: "Username",
                    placeholder: "Joe Smith"
                },
                password: {
                    type: "text",
                    label: "Password",
                    placeholder: "pass****"
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missinfg Credentials")
                }
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("No User Found for credentials")
                }
                const isMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isMatch) {
                    throw new Error("No User Found for credentials")
                }
                return user;
            }
        }),
        GithubProvider({
            clientId: "",
            clientSecret: "",
        }),
        GoogleProvider({
            clientId: "",
            clientSecret: "",
        }),
        AppleProvider({
            clientId: "",
            clientSecret: "",
        }),
        Auth0({
            clientId: "",
            clientSecret: "",
        }),
        FacebookProvider({
            clientId: "",
            clientSecret: "",
        }),
        InstagramProvider({
            clientId: "",
            clientSecret: "",
        }),
        LinkedInProvider({
            clientId: "",
            clientSecret: "",
        }),
        SpotifyProvider({
            clientId: "",
            clientSecret: "",
        }),
        NetlifyProvider({
            clientId: "",
            clientSecret: "",
        }),
    ],
    secret: env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {},
    debug: process.env.NODE_ENV === "development",
}