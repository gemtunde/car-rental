import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

//get users
export async function GET(request: NextRequest) {
  try {
    await validateTokenAndGetUserId(request);
    const users = await User.find();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
