import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const user = await User.findOne({ email: reqBody.email });
    //check if user exists
    if (user) {
      throw new Error("user already exist");
    }

    //hash passsword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashPassword;

    //create user
    await User.create(reqBody);
    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
