import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/dashboard?invite=invalid", req.url));
  }

  const invite = await db.teamInvite.findUnique({
    where: { token },
    include: { team: true },
  });

  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/dashboard?invite=expired", req.url));
  }

  const session = await auth();
  if (!session?.user?.email) {
    // Redirect to sign in, preserving the token
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=/api/team/accept-invite?token=${token}`, req.url)
    );
  }

  // Ensure signed-in user matches the invite email
  if (session.user.email.toLowerCase() !== invite.email.toLowerCase()) {
    return NextResponse.redirect(
      new URL("/dashboard?invite=wrong-email", req.url)
    );
  }

  // Find or create user
  const user = await db.user.upsert({
    where: { email: invite.email },
    update: {},
    create: { email: invite.email, name: invite.email.split("@")[0], gradeLevels: [] },
    select: { id: true },
  });

  // Add to team
  await db.teamMember.upsert({
    where: { teamId_userId: { teamId: invite.teamId, userId: user.id } },
    update: { role: invite.role },
    create: { teamId: invite.teamId, userId: user.id, role: invite.role },
  });

  // Mark invite as accepted
  await db.teamInvite.update({
    where: { id: invite.id },
    data: { acceptedAt: new Date() },
  });

  return NextResponse.redirect(new URL("/dashboard/team?invite=accepted", req.url));
}
