import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const { pathname, searchParams } = request.nextUrl;

  // /avatar?preview is public — lets devs view the page without auth
  if (pathname === "/avatar" && searchParams.has("preview")) {
    return response;
  }

  // Unauthenticated users can't access protected routes
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated users don't need to be on /login
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/ballot", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/ballot/:path*", "/party", "/avatar", "/login"],
};
