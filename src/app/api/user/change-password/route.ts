import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/route-utils";
import { changePasswordSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const body = await req.json().catch(() => ({}));
  const result = changePasswordSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: { id: userId! },
    select: { password: true },
  });

  if (!user?.password) {
    return NextResponse.json(
      { error: "الحساب مرتبط بـ Google أو Microsoft — لا يمكن تغيير كلمة المرور من هنا" },
      { status: 400 }
    );
  }

  const isValid = await compare(result.data.currentPassword, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "كلمة المرور الحالية غير صحيحة" }, { status: 400 });
  }

  const hashedPassword = await hash(result.data.newPassword, 12);
  await db.user.update({
    where: { id: userId! },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ message: "تم تغيير كلمة المرور بنجاح" });
}
