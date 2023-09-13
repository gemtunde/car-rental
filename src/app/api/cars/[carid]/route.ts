import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

//get single car by id
export async function GET(request: NextRequest, { params }: any) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const car = await Car.findById(params.carid);
    return NextResponse.json({ data: car }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//edit car by id, use id in the request body sent from the frontend
export async function PUT(request: NextRequest) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const reqBody: any = await request.json();

    await Car.findByIdAndUpdate(reqBody._id, reqBody);
    return NextResponse.json(
      {
        message: "Car successfully updated",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//delete car by id, use params coz no values is sent from frontend
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    await validateTokenAndGetUserId(request);
    await Car.findByIdAndDelete(params.carid);
    return NextResponse.json({
      message: "Car Deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
