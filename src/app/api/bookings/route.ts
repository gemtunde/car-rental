import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(request: NextRequest) {
  try {
    await validateTokenAndGetUserId(request);
    const reqBody = await request.json();
    await Booking.create(reqBody);
    return NextResponse.json(
      {
        message: "Bookings added sucessfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
