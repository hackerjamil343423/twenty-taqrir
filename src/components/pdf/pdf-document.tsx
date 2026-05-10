import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { MinistryHeader } from "./ministry-header";
import { ReportFooter } from "./report-footer";

// Register Arabic font (TheYearofHandicrafts not available in @react-pdf, use fallback)
Font.register({
  family: "Cairo",
  fonts: [
    { src: "https://fonts.gstatic.com/s/cairo/v28/SXuwtxSbqnwNk5kC6T8q.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/cairo/v28/SXuwtxSbqnwNk5kB6T8q.woff2", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Cairo",
    fontSize: 11,
    padding: 40,
    paddingTop: 20,
    paddingBottom: 30,
    direction: "rtl",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111111",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1px solid #e9eaeb",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: "40%",
    color: "#615e5b",
    fontSize: 10,
  },
  value: {
    width: "60%",
    color: "#111111",
    fontWeight: 700,
  },
  bodyText: {
    fontSize: 11,
    color: "#111111",
    lineHeight: 1.6,
    textAlign: "justify",
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: "45%",
    alignItems: "center",
  },
  signatureLine: {
    borderTop: "1px solid #111111",
    marginTop: 60,
    paddingTop: 5,
    width: "100%",
    textAlign: "center",
    fontSize: 10,
    color: "#615e5b",
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: 60,
    color: "#e9eaeb",
    opacity: 0.3,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    color: "#615e5b",
  },
});

interface PDFDocumentProps {
  data: Record<string, unknown>;
  templateName: string;
  isDraft?: boolean;
  qrCodeUrl?: string;
}

function toText(value: unknown, fallback = "") {
  return typeof value === "string" || typeof value === "number" ? String(value) : fallback;
}

export function ReportPDFDocument({ data, templateName, isDraft = false, qrCodeUrl }: PDFDocumentProps) {
  const subject = toText(data.subject);
  const grade = toText(data.grade);
  const goal = toText(data.goal);
  const description = toText(data.description);
  const results = toText(data.results);
  const tools = Array.isArray(data.tools)
    ? data.tools.map((tool) => toText(tool)).filter(Boolean).join(" • ")
    : toText(data.tools);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Ministry Header */}
        <View style={styles.header}>
          <MinistryHeader />
        </View>

        {/* Draft Watermark */}
        {isDraft && <Text style={styles.watermark}>مسودة</Text>}

        {/* Report Content */}
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.section}>
            <Text style={{ fontSize: 18, fontWeight: 700, textAlign: "center", color: "#111111", marginBottom: 5 }}>
              {toText(data.title, templateName)}
            </Text>
            <Text style={{ fontSize: 10, textAlign: "center", color: "#615e5b" }}>
              {templateName}
            </Text>
          </View>

          {/* Metadata Grid */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.label}>تاريخ التنفيذ:</Text>
              <Text style={styles.value}>{toText(data.date, "_____")}</Text>
            </View>
            {subject && (
              <View style={styles.row}>
                <Text style={styles.label}>المادة الدراسية:</Text>
                <Text style={styles.value}>{subject}</Text>
              </View>
            )}
            {grade && (
              <View style={styles.row}>
                <Text style={styles.label}>الصف الدراسي:</Text>
                <Text style={styles.value}>{grade}</Text>
              </View>
            )}
          </View>

          {/* Goal Section */}
          {goal && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الهدف</Text>
              <Text style={styles.bodyText}>{goal}</Text>
            </View>
          )}

          {/* Description Section */}
          {description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الوصف</Text>
              <Text style={styles.bodyText}>{description}</Text>
            </View>
          )}

          {/* Tools Section */}
          {tools && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الأدوات المستخدمة</Text>
              <Text style={styles.bodyText}>{tools}</Text>
            </View>
          )}

          {/* Results Section */}
          {results && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>النتائج المتوقعة</Text>
              <Text style={styles.bodyText}>{results}</Text>
            </View>
          )}

          {/* QR Code + Evidence Section */}
          {qrCodeUrl && (
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text style={{ fontSize: 8, color: "#615e5b", marginBottom: 5 }}>
               扫描二维码验证
              </Text>
              {/* QR placeholder - in real implementation would use an image */}
              <View style={{ width: 60, height: 60, border: "1px solid #d8d3cc" }} />
            </View>
          )}
        </View>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureLine}>توقيع المسؤول</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureLine}>الختم</Text>
          </View>
        </View>

        {/* Footer */}
        <ReportFooter />

        {/* Page Number */}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
}
