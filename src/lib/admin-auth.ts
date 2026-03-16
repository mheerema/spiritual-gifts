import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHash, createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_token";

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD env var is not set");
  return pw;
}

/** Generate a signed token from the admin password */
export function generateToken(): string {
  const password = getAdminPassword();
  const hash = createHash("sha256").update(password).digest("hex");
  const signature = createHmac("sha256", password)
    .update(hash)
    .digest("hex");
  return `${hash}.${signature}`;
}

/** Verify a token matches the current admin password */
export function verifyToken(token: string): boolean {
  try {
    const password = getAdminPassword();
    const [hash, signature] = token.split(".");
    if (!hash || !signature) return false;

    const expectedHash = createHash("sha256").update(password).digest("hex");
    const hashBuf = Buffer.from(hash);
    const expectedHashBuf = Buffer.from(expectedHash);
    if (hashBuf.length !== expectedHashBuf.length || !timingSafeEqual(hashBuf, expectedHashBuf)) return false;

    const expectedSig = createHmac("sha256", password)
      .update(hash)
      .digest("hex");
    const sigBuf = Buffer.from(signature);
    const expectedSigBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expectedSigBuf.length || !timingSafeEqual(sigBuf, expectedSigBuf)) return false;
    return true;
  } catch {
    return false;
  }
}

/** Check admin auth from cookies. Returns NextResponse with 401 if not authenticated, null if OK. */
export async function requireAdmin(): Promise<NextResponse | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

/** Cookie name export for login route */
export { COOKIE_NAME };
