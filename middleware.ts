import { authMiddleware } from "@clerk/nextjs";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { PAGINATION_LIMITS } from "@/app/utils";

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const nextUrl = request.nextUrl;
  if (nextUrl.pathname === "/") {
    let changed = false;

    const limit = nextUrl.searchParams.get("limit");
    if (limit && !PAGINATION_LIMITS.includes(parseInt(limit))) {
      changed = true;
      nextUrl.searchParams.delete("limit");
    }

    const page = nextUrl.searchParams.get("page");
    if (page && parseInt(page) < 1) {
      changed = true;
      nextUrl.searchParams.delete("page");
    }

    if (changed) return NextResponse.redirect(nextUrl);
  }

  return authMiddleware({
    publicRoutes: ["/", "/:name"],
  })(request, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
