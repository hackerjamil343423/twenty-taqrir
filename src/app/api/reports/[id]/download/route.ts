import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ReportPDFDocument } from "@/components/pdf/pdf-document";

type RouteContext = { params: Promise<{ id: string }> };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const shareToken = req.nextUrl.searchParams.get("shareToken");

  const session = await auth();
  const userId = session?.user?.id;

  // Allow access if: (a) authenticated owner, or (b) valid share token provided
  const report = await db.report.findFirst({
    where: {
      id,
      OR: [
        ...(userId ? [{ userId }] : []),
        ...(shareToken ? [{ shareToken, isShared: true }] : []),
      ],
    },
    include: { template: true },
  });

  if (!report || report.status === "ARCHIVED") {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  if (!userId && !shareToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pdfBuffer = await renderToBuffer(
    ReportPDFDocument({
      data: isRecord(report.data) ? report.data : {},
      templateName: report.template.name,
      isDraft: report.status === "DRAFT",
    })
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="report-${id}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
