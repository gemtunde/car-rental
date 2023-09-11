import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/dbConfig";

connectDB();
//post login
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    //check if user exist
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("user not found");
    }

    //compare password
    let validPassword = await bcrypt.compare(reqBody.password, user.password);
    if (!validPassword) {
      throw new Error("invalid password");
    }

    const response = NextResponse.json({
      message: "Login Successful",
    });

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    //set cookies
    response.cookies.set("token", token, {
      path: "/",
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//get login

export async function GET(request: NextRequest) {
  try {
    let reqBody = await request.json();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
