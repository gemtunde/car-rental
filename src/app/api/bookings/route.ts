import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

//stripe for backend/api
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

connectDB();
export async function POST(request: NextRequest) {
  try {
    await validateTokenAndGetUserId(request);
    const reqBody = await request.json();

    //make payment

    //create customer
    const customer = await stripe.customers.create({
      email: reqBody.email,
      source: reqBody.token.id,
    });

    //create charge
    const payment = await stripe.charges.create(
      {
        amount: reqBody.totalAmount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: reqBody.email,
        description: "Booking for Gemtunde-Cars",
      },
      {
        idempotencyKey: reqBody.token.id,
      }
    );
    reqBody.paymentId = payment.id;

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
