
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { apiGetSession } from "./app/lib/api-request"

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // get cookie
  const token = await request.cookies.get("authsession") ?? "";

  // to handle if there is no token, but want to access special role, will sent to root path
  if (typeof token == undefined || token === "") {
    if (request.nextUrl.pathname.startsWith("/seller")) {
      return NextResponse.redirect(new URL("/", request.url));
    } 
  }

  try {
    // request to server 
    const response = await apiGetSession(token.value);
    // if there is a token, and it want to access special role, if authorized, request accept and if not will sent to root path
    if (request.nextUrl.pathname.startsWith("/seller")) {
      if (response.data.role === "seller") {
          return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // if user want to access root path but have authority to access a special page, will sent to appropriate page according to its authority, if not request accept
    if (request.nextUrl.pathname === "/") {
      if (response.data.role === "seller") {
        return NextResponse.redirect(new URL("/seller/dashboard", request.url));
      } 
        return NextResponse.next();
      
    }

    // if user hava authority whether special or not if want to access login or register will sent back to appropriate page according to its authority.
    if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname.startsWith("/register")) {
      if (response.data.role === "customer") {
        return NextResponse.redirect(new URL("/", request.url));
      } else if (response.data.role === "seller") {
        return NextResponse.redirect(new URL("/seller/dashboard", request.url));
      } 
    }
  } catch (error) {
    // if there is a token on cookie, but there is no record in database or cookie expired then its permisibble to access non spesific page
    if (request.nextUrl.pathname.startsWith("/register") || request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL("/", request.url));
    
  }
}

export const config = {
  matcher: ["/seller/:path*", "/login", "/register", "/"] 
};
