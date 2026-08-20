import { updateSession } from "@/lib/supabase/proxy";
import type { NextRequest } from "next/server";

// Next.js 16 renamed Middleware to Proxy — same functionality, this file
// replaces what used to be middleware.ts.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|icon|apple-icon|manifest\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
