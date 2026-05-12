import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCatalogTemplate } from "@/lib/template-catalog";
import { renderToBuffer } from "@react-pdf/renderer";
import { NationalDayThanksPDF } from "@/components/pdf/national-day-thanks-pdf";
import { StudentFollowUpPDF } from "@/components/pdf/student-follow-up-pdf";
import React from "react";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const sijil = await db.sijil.findUnique({ where: { token, isActive: true } });
  if (!sijil) {
    return NextResponse.json({ error: "السجل غير موجود" }, { status: 404 });
  }

  const template = getCatalogTemplate(sijil.templateSlug);
  if (!template) {
    return NextResponse.json({ error: "القالب غير موجود" }, { status: 404 });
  }

  const body = await req.json();
  const data = (body.data ?? {}) as Record<string, unknown>;

  const element =
    template.pdfConfig.layout === "student-follow-up-record"
      ? React.createElement(StudentFollowUpPDF, { data })
      : template.pdfConfig.layout === "national-day-thanks-certificate"
        ? React.createElement(NationalDayThanksPDF, { data })
        : null;

  if (!element) {
    return NextResponse.json({ error: "القالب غير مدعوم" }, { status: 400 });
  }

  const buffer = await renderToBuffer(element as Parameters<typeof renderToBuffer>[0]);

  await db.sijil.update({
    where: { id: sijil.id },
    data: { usageCount: { increment: 1 } },
  });

  const encodedName = encodeURIComponent(`${sijil.title}.pdf`);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodedName}`,
    },
  });
}
