import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/route-utils";

export async function PATCH(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const body = await req.json().catch(() => ({}));

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await db.user.update({
    where: { id: userId! },
    data: { notificationPrefs: body },
  });

  return NextResponse.json({ message: "تم حفظ تفضيلات الإشعارات" });
}
