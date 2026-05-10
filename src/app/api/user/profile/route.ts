import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/route-utils";
import { updateProfileSchema } from "@/lib/validators";

export async function GET() {
  const { response, userId } = await requireUser();
  if (response) return response;

  const user = await db.user.findUnique({
    where: { id: userId! },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      schoolName: true,
      region: true,
      gradeLevels: true,
      notificationPrefs: true,
      subscriptionStatus: true,
      createdAt: true,
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const body = await req.json().catch(() => ({}));
  const result = updateProfileSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  const updated = await db.user.update({
    where: { id: userId! },
    data: result.data,
    select: {
      id: true,
      name: true,
      email: true,
      schoolName: true,
      region: true,
      gradeLevels: true,
    },
  });

  return NextResponse.json({ user: updated });
}
