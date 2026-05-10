import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadFile } from "@/lib/storage";
import { requireUser } from "@/lib/route-utils";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const formData = await req.formData();
  const file = formData.get("avatar");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "الملف مطلوب" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "صيغة الصورة غير مدعومة (JPG, PNG, WebP فقط)" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "حجم الصورة يجب أن يكون أقل من 2MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.type.split("/")[1];
  const key = `avatars/${userId!}/${Date.now()}.${ext}`;
  const imageUrl = await uploadFile(key, buffer, file.type);

  const updated = await db.user.update({
    where: { id: userId! },
    data: { image: imageUrl },
    select: { image: true },
  });

  return NextResponse.json({ image: updated.image });
}
