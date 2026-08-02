import { NextResponse } from "next/server";
import { initialProperties } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ success: true, data: initialProperties });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newProperty = { id: "p_" + Date.now(), ...body };
  return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
}
