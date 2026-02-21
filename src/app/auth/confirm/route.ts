import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("code");
  const type = searchParams.get("type");
  const redirectTo = new URL("/login", request.url);

  if (type == null) redirectTo.searchParams.set("error", "unrecognized_type");

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as EmailOtpType });

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
