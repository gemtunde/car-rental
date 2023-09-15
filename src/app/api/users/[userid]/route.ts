import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

//edit car by id, use id in the request body sent from the frontend
export async function PUT(request: NextRequest, { params }: any) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const reqBody: any = await request.json();

    await User.findByIdAndUpdate(params.userid, reqBody);
    return NextResponse.json(
      {
        message: "User successfully updated",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
