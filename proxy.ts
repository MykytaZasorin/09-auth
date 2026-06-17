// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let isAuth = !!accessToken;
  let responseWithNewCookies: NextResponse | null = null;

  if (!isAuth && refreshToken) {
    try {
      const sessionResponse = await checkSession();

      if (sessionResponse && sessionResponse.data) {
        isAuth = true;

        const setCookieHeader = sessionResponse.headers["set-cookie"];
        if (setCookieHeader) {
          responseWithNewCookies = NextResponse.next();
          responseWithNewCookies.headers.set(
            "set-cookie",
            String(setCookieHeader),
          );
        }
      }
    } catch (error) {
      console.error("Помилка перевірки сесії у проксі:", error);
      isAuth = false;
    }
  }

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPrivateRoute && !isAuth) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicRoute && isAuth) {
    const redirectResponse = NextResponse.redirect(new URL("/", request.url));
    if (responseWithNewCookies) {
      redirectResponse.headers.set(
        "set-cookie",
        String(responseWithNewCookies.headers.get("set-cookie")),
      );
    }
    return redirectResponse;
  }

  if (responseWithNewCookies) {
    return responseWithNewCookies;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
