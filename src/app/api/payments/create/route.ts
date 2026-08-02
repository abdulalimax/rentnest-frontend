import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { price, propertyTitle } = body;

    return NextResponse.json({ 
      success: true, 
      url: "/payment/success?session_id=test_stripe_session_2026" 
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Payment creation failed" }, { status: 500 });
  }
}
