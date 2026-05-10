import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadFile } from "@/lib/storage";
import { asString, requireUser } from "@/lib/route-utils";

export async function POST(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const formData = await req.formData();
  const reportId = asString(formData.get("reportId"));
  const files = formData.getAll("files").filter((file): file is File => file instanceof File);

  if (!reportId || files.length === 0) {
    return NextResponse.json({ error: "reportId and files are required" }, { status: 400 });
  }

  const report = await db.report.findFirst({ where: { id: reportId, userId: userId! } });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const evidence = await Promise.all(
    files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const key = `evidence/${reportId}/${Date.now()}-${file.name}`;
      const fileUrl = await uploadFile(key, buffer, file.type || "application/octet-stream");

      return db.evidence.create({
        data: {
          reportId,
          fileName: file.name,
          fileType: file.type || "application/octet-stream",
          fileSize: file.size,
          fileUrl,
        },
      });
    })
  );

  return NextResponse.json({ evidence }, { status: 201 });
}
