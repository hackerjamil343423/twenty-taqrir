import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const signupAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

type SignupBody = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
  schoolName?: unknown;
  region?: unknown;
  gradeLevels?: unknown;
};

const allowedGradeLevels = new Set(["elementary", "middle", "high"]);

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getClientKey(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = signupAttempts.get(key);

  if (!current || current.resetAt <= now) {
    signupAttempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeGradeLevels(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => allowedGradeLevels.has(item));
}

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(getClientKey(req))) {
      return NextResponse.json({ error: "Too many signup attempts" }, { status: 429 });
    }

    const body = (await req.json()) as SignupBody;
    const name = asTrimmedString(body.name);
    const email = asTrimmedString(body.email).toLowerCase();
    const password = asTrimmedString(body.password);
    const schoolName = asTrimmedString(body.schoolName);
    const region = asTrimmedString(body.region);
    const gradeLevels = normalizeGradeLevels(body.gradeLevels);

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (
      name.length < 2 ||
      name.length > 100 ||
      !isValidEmail(email) ||
      password.length < 8 ||
      password.length > 128
    ) {
      return NextResponse.json({ error: "Invalid signup details" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        schoolName: schoolName || null,
        region: region || null,
        gradeLevels,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ message: "Account created", user }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Unable to create account" }, { status: 400 });
    }

    console.error("Signup error:", error);
    return NextResponse.json({ error: "Unable to create account" }, { status: 500 });
  }
}
