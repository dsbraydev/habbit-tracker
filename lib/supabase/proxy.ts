import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Everything under these prefixes requires a signed-in session. Everything
// else (the sign-in page at "/", PWA/manifest/icon routes, static assets)
// stays public regardless of auth state.
const protectedPrefixes = [
  "/home",
  "/history",
  "/streaks",
  "/stats",
  "/profile",
  "/create-habit",
  "/edit-habit",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Don't put this client in a global variable — create a new one on each
  // request (matters for Fluid compute / edge environments).
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and getClaims() — a simple
  // mistake here can make it very hard to debug users being randomly logged
  // out. getClaims() (not getSession()) validates the JWT signature against
  // the project's published keys, so it's safe to trust server-side.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const isProtected = protectedPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Mirror of the check above: an already-signed-in user landing on the
  // sign-in page (this is what happens every time the installed PWA opens,
  // since manifest.ts sets start_url: "/") should skip straight to the
  // dashboard instead of seeing the login form again.
  if (request.nextUrl.pathname === "/" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // Must return supabaseResponse as-is (or copy its cookies onto a new
  // response) — otherwise the browser and server can fall out of sync and
  // the user's session ends prematurely.
  return supabaseResponse;
}
