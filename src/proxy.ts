import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isAdminApi =
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/login") &&
    !pathname.startsWith("/api/admin/logout");

  if (isAdminPage || isAdminApi) {
    const session = req.cookies.get("admin_session")?.value;
    const password = process.env.ADMIN_PASSWORD;
    if (!session || !password || session !== password) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
      }

      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
