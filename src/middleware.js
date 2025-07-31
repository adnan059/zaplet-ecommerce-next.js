import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "authjs.session-token",
  });

  // 🎯 Protect ONLY /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    if (!token.isAdmin) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 🔁 Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth")) {
    if (token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 🔓 Allow public routes: /, /about, etc.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // covers nested dashboard routes
    "/dashboard", // root dashboard
    "/auth/:path*", // login/register
  ],
};
