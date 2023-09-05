import { connectToDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt, { } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { username, email, password } = data;
    console.log({ username, email, password });
    if (!username || !email || !password) {
        return new NextResponse("Missing username or email", {
            status: 401,
        })
    }
    await connectToDB();
    const exist = await User.findOne({ email });
    if (exist) {
        return new NextResponse("Already Exist", { status: 402 })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        username,
        email,
        hashedPassword
    })
    return new NextResponse("New User Created Successfully", { status: 201 })
}