import { NextResponse } from "next/server";
import { initialUsers } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json();
  const user = initialUsers.find((u) => u.email === body.email) || {
    id: "u_" + Date.now(),
    name: body.email.split("@")[0],
    email: body.email,
    role: body.role || "Tenant",
  };
  return NextResponse.json({ success: true, user, token: "mock-jwt-token-2026" });
}
