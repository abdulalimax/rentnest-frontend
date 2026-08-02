import { NextResponse } from "next/server";
import { initialRequests } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ success: true, data: initialRequests });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newRental = { id: "req_" + Date.now(), status: "PENDING", ...body };
  return NextResponse.json({ success: true, data: newRental }, { status: 201 });
}
