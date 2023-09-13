import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const reqBody = await request.json();
    reqBody.addedBy = userId;
    const car = await Car.create(reqBody);
    return NextResponse.json(
      { data: car, message: "Car is successfully added" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//fetch all cars
export async function GET(request: NextRequest) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const cars = await Car.find();
    return NextResponse.json({ data: cars });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
