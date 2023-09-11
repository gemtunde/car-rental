import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Getting cookies from the request using the `RequestCookies` API
  let token = request.cookies.get("token")?.value;

  //get req url
  const { pathname } = request.nextUrl;

  //set public route
  const publicRoute = pathname === "/login" || pathname === "/register";

  //set authorization
  if (!token && !publicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //if token is present..no need to visit to login or register page
  if (token && publicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/login", "/register"],
};
