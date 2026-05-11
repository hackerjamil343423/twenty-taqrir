import path from "path";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { MinistryHeader } from "./ministry-header";
import { ReportFooter } from "./report-footer";
import type { CatalogTemplate } from "@/lib/template-catalog";

const fontsDir = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Cairo",
  fonts: [
    { src: path.join(fontsDir, "Cairo-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Cairo-Bold.ttf"), fontWeight: 700 },
  ],
});

const s = StyleSheet.create({
  page: {
    fontFamily: "Cairo",
    fontSize: 11,
    padding: 40,
    paddingTop: 24,
    paddingBottom: 60,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
    color: "#111111",
    marginTop: 16,
    marginBottom: 4,
  },
  templateName: {
    fontSize: 10,
    textAlign: "center",
    color: "#615e5b",
    marginBottom: 20,
  },
  divider: {
    borderBottom: "1px solid #e9eaeb",
    marginBottom: 16,
  },
  fieldRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 9,
    color: "#615e5b",
    marginBottom: 3,
  },
  value: {
    fontSize: 11,
    color: "#111111",
    lineHeight: 1.5,
  },
  emptyValue: {
    fontSize: 11,
    color: "#d8d3cc",
  },
  tableContainer: {
    marginTop: 4,
    borderTop: "1px solid #e9eaeb",
    borderLeft: "1px solid #e9eaeb",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e9eaeb",
  },
  tableCell: {
    flex: 1,
    padding: 6,
    borderRight: "1px solid #e9eaeb",
    fontSize: 10,
  },
  tableHeaderCell: {
    flex: 1,
    padding: 6,
    borderRight: "1px solid #e9eaeb",
    fontSize: 10,
    fontWeight: 700,
    backgroundColor: "#f3efeb",
    color: "#615e5b",
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
    marginTop: 50,
    paddingTop: 5,
    width: "100%",
    textAlign: "center",
    fontSize: 10,
    color: "#615e5b",
  },
  pageNumber: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    color: "#615e5b",
  },
});

interface SijilPDFProps {
  title: string;
  templateName: string;
  fields: CatalogTemplate["fields"];
  data: Record<string, unknown>;
}

function renderValue(
  value: unknown,
  field: CatalogTemplate["fields"][number]
): string {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "string") {
    if (field.options) {
      const opt = field.options.find((o) => o.value === value);
      return opt ? opt.label : value;
    }
    return value;
  }
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    if (typeof value[0] === "string") {
      const labels = value.map((v) => {
        const opt = field.options?.find((o) => o.value === v);
        return opt ? opt.label : String(v);
      });
      return labels.join(" • ");
    }
    return "";
  }
  return String(value);
}

export function SijilPDF({ title, templateName, fields, data }: SijilPDFProps) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <MinistryHeader />

        <Text style={s.title}>{title}</Text>
        <Text style={s.templateName}>{templateName}</Text>
        <View style={s.divider} />

        {fields.map((field) => {
          if (field.type === "file") return null;

          const value = data[field.id];

          if (field.type === "table") {
            const rows = Array.isArray(value) ? (value as Record<string, string>[]) : [];
            if (!field.columns) return null;
            return (
              <View key={field.id} style={s.fieldRow}>
                <Text style={s.label}>{field.label}</Text>
                <View style={s.tableContainer}>
                  <View style={s.tableRow}>
                    {field.columns.map((col) => (
                      <Text key={col.key} style={s.tableHeaderCell}>{col.label}</Text>
                    ))}
                  </View>
                  {rows.map((row, i) => (
                    <View key={i} style={s.tableRow}>
                      {field.columns!.map((col) => (
                        <Text key={col.key} style={s.tableCell}>{row[col.key] ?? ""}</Text>
                      ))}
                    </View>
                  ))}
                  {rows.length === 0 && (
                    <View style={s.tableRow}>
                      {field.columns.map((col) => (
                        <Text key={col.key} style={s.tableCell}>{""}</Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            );
          }

          const rendered = renderValue(value, field);
          return (
            <View key={field.id} style={s.fieldRow}>
              <Text style={s.label}>{field.label}</Text>
              {rendered ? (
                <Text style={s.value}>{rendered}</Text>
              ) : (
                <Text style={s.emptyValue}>—</Text>
              )}
            </View>
          );
        })}

        <View style={s.signatureSection}>
          <View style={s.signatureBlock}>
            <Text style={s.signatureLine}>توقيع المسؤول</Text>
          </View>
          <View style={s.signatureBlock}>
            <Text style={s.signatureLine}>الختم</Text>
          </View>
        </View>

        <ReportFooter />
        <Text
          style={s.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
