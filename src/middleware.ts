import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(role ? `/dashboard/${role}` : "/dashboard", request.url));
    }

    if (pathname.startsWith("/dashboard/landlord") && role !== "landlord" && role !== "admin") {
      return NextResponse.redirect(new URL(role ? `/dashboard/${role}` : "/dashboard", request.url));
    }

    if (pathname.startsWith("/dashboard/tenant") && role !== "tenant" && role !== "admin") {
      return NextResponse.redirect(new URL(role ? `/dashboard/${role}` : "/dashboard", request.url));
    }
  }

  if ((pathname === "/login" || pathname === "/register") && token && role) {
    return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
