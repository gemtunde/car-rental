import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function PUT(request: NextRequest, { params }: any) {
  try {
    await validateTokenAndGetUserId(request);
    const reqBody = await request.json();

    const update = await Booking.findByIdAndUpdate(params.bookingid, reqBody);
    return NextResponse.json(
      { message: "Booking is canceled" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
