import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/route-utils";

export async function GET() {
  const { response, userId } = await requireUser();
  if (response) return response;

  const membership = await db.teamMember.findFirst({
    where: { userId: userId! },
    include: {
      team: {
        include: {
          members: { include: { user: true }, orderBy: { joinedAt: "asc" } },
        },
      },
    },
  });

  if (membership) {
    return NextResponse.json({ team: membership.team, membership });
  }

  const user = await db.user.findUnique({ where: { id: userId! } });
  const team = await db.team.create({
    data: {
      name: user?.schoolName || "فريق المدرسة",
      schoolName: user?.schoolName || "مدرستي",
      adminId: userId!,
      members: {
        create: {
          userId: userId!,
          role: "ADMIN",
        },
      },
    },
    include: { members: { include: { user: true } } },
  });

  return NextResponse.json({ team, membership: team.members[0] });
}
