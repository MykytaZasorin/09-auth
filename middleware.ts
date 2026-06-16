import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];

const publicRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession =
    request.cookies.has("session") ||
    request.cookies.has("auth-token") ||
    request.cookies.has("token");

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isPrivateRoute && !hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isPublicRoute && hasSession) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
