import { NextResponse } from "next/server";

export function middleware() {
  const res = NextResponse.next();

  res.headers.set("X-Robots-Tag", "index, follow");

  return res;
}

export const config = {
  matcher: "/:path*",
};