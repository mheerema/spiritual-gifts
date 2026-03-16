import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { generateToken, verifyToken, COOKIE_NAME } from "@/lib/admin-auth";
import { cookies } from "next/headers";

/**
 * POST /api/admin/login
 * Verify password against ADMIN_PASSWORD env var and set httpOnly cookie.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { password } = body as { password?: string };

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin access is not configured" },
        { status: 500 }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const pwBuf = Buffer.from(String(password));
    const adminBuf = Buffer.from(adminPassword);
    if (pwBuf.length !== adminBuf.length || !timingSafeEqual(pwBuf, adminBuf)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = generateToken();
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/admin/login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/login
 * Check if current session is authenticated.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const authenticated = token ? verifyToken(token) : false;
    return NextResponse.json({ authenticated });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
