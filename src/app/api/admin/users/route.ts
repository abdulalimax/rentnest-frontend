import { NextResponse } from "next/server";
import { initialUsers } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ success: true, data: initialUsers });
}
