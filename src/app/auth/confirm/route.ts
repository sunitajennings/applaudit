import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("code");
  let type = searchParams.get("type");

  if (type == null) redirectTo.searchParams.set("error", "unrecognized_type");

  const redirectTo = new URL("/login", request.url);

  if (token_hash) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (!error) {
      return NextResponse.redirect(new URL("/avatar", request.url));
    }

    redirectTo.searchParams.set("error", "verification_failed");
  } else {
    console.log("redirecting");
    redirectTo.searchParams.set("error", "missing_token");
  }

  return NextResponse.redirect(redirectTo);
}
