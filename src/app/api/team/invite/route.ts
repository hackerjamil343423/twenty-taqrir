import { NextRequest, NextResponse } from "next/server";
import { TeamRole } from "@prisma/client";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { asString, parseJsonRecord, requireUser } from "@/lib/route-utils";
import { sendTeamInviteEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const body = parseJsonRecord(await req.json().catch(() => ({})));
  const email = asString(body.email).toLowerCase();
  const roleValue = asString(body.role, "VIEWER").toUpperCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "بريد إلكتروني صالح مطلوب" }, { status: 400 });
  }

  const adminMembership = await db.teamMember.findFirst({
    where: { userId: userId!, role: "ADMIN" },
    include: { team: true, user: { select: { name: true } } },
  });
  if (!adminMembership) {
    return NextResponse.json({ error: "المسؤولون فقط يمكنهم دعوة أعضاء" }, { status: 403 });
  }

  // If user already exists and is a member, update role
  const existingUser = await db.user.findUnique({ where: { email }, select: { id: true } });
  if (existingUser) {
    const existingMember = await db.teamMember.findUnique({
      where: { teamId_userId: { teamId: adminMembership.teamId, userId: existingUser.id } },
    });
    if (existingMember) {
      return NextResponse.json({ error: "هذا المستخدم عضو في الفريق بالفعل" }, { status: 400 });
    }
  }

  // Remove any pending invites for this email in this team
  await db.teamInvite.deleteMany({
    where: { teamId: adminMembership.teamId, email, acceptedAt: null },
  });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const role = roleValue in TeamRole ? (roleValue as TeamRole) : "VIEWER";

  const invite = await db.teamInvite.create({
    data: { teamId: adminMembership.teamId, email, role, token, expiresAt },
  });

  await sendTeamInviteEmail(
    email,
    adminMembership.user.name ?? "مسؤول الفريق",
    adminMembership.team.name,
    token
  );

  return NextResponse.json({ invite, message: "تم إرسال الدعوة" }, { status: 201 });
}
