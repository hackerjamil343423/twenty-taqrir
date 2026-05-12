import path from "path";
import { readFileSync } from "fs";
import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const fontsDir = path.join(process.cwd(), "public", "fonts");
const backgroundPath = path.join(process.cwd(), "public", "templates", "national-day-thanks-bg.png");
const backgroundDataUri = `data:image/png;base64,${readFileSync(backgroundPath).toString("base64")}`;

Font.register({
  family: "Cairo",
  fonts: [
    { src: path.join(fontsDir, "Cairo-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Cairo-Bold.ttf"), fontWeight: 700 },
  ],
});

type NationalDayThanksData = {
  introLine?: unknown;
  studentNames?: unknown;
  message1?: unknown;
  message2?: unknown;
  message3?: unknown;
  optionalLine?: unknown;
  teacherTitle?: unknown;
  teacherName?: unknown;
  principalTitle?: unknown;
  principalName?: unknown;
};

const landscapeA4 = { width: 842, height: 595 };
const green = "#459b3f";
const darkGreen = "#088577";

const s = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  canvas: {
    width: 842,
    height: 595,
    fontFamily: "Cairo",
    color: "#000000",
    padding: 0,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 842,
    height: 595,
  },
  coverIntro: {
    position: "absolute",
    top: 210,
    left: 210,
    width: 422,
    height: 33,
    backgroundColor: "#ffffff",
  },
  intro: {
    position: "absolute",
    top: 213,
    left: 170,
    width: 502,
    textAlign: "center",
    fontSize: 19,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  nameBar: {
    position: "absolute",
    top: 245,
    left: 201,
    width: 455,
    height: 36,
    borderRadius: 7,
    backgroundColor: green,
  },
  nameShadow: {
    position: "absolute",
    top: 250.5,
    left: 203,
    width: 455,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 700,
    color: "#000000",
  },
  name: {
    position: "absolute",
    top: 247,
    left: 201,
    width: 455,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 700,
    color: "#ffffff",
  },
  coverNameBottom: {
    position: "absolute",
    top: 282,
    left: 210,
    width: 422,
    height: 14,
    backgroundColor: "#ffffff",
  },
  coverMessage: {
    position: "absolute",
    top: 296,
    left: 135,
    width: 572,
    height: 84,
    backgroundColor: "#ffffff",
  },
  messageBlock: {
    position: "absolute",
    top: 298,
    left: 100,
    width: 642,
    textAlign: "center",
  },
  messageLine: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.45,
    textAlign: "center",
  },
  optionalLine: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.25,
    textAlign: "center",
  },
  coverPrincipalTitle: {
    position: "absolute",
    top: 416,
    left: 78,
    width: 200,
    height: 36,
    backgroundColor: "#ffffff",
  },
  coverPrincipalName: {
    position: "absolute",
    top: 470,
    left: 78,
    width: 200,
    height: 38,
    backgroundColor: "#ffffff",
  },
  coverTeacherTitle: {
    position: "absolute",
    top: 416,
    left: 535,
    width: 220,
    height: 36,
    backgroundColor: "#ffffff",
  },
  coverTeacherName: {
    position: "absolute",
    top: 470,
    left: 555,
    width: 165,
    height: 34,
    backgroundColor: "#ffffff",
  },
  signatureTitle: {
    position: "absolute",
    top: 418,
    width: 205,
    textAlign: "center",
    color: darkGreen,
    fontSize: 20,
    fontWeight: 700,
  },
  signatureName: {
    position: "absolute",
    top: 476,
    width: 205,
    textAlign: "center",
    color: "#000000",
    fontSize: 20,
    fontWeight: 700,
  },
});

function text(input: unknown, fallback: string) {
  return typeof input === "string" && input.trim() ? input.trim() : fallback;
}

function namesFromData(data: NationalDayThanksData) {
  const raw = typeof data.studentNames === "string" ? data.studentNames : "";
  const names = raw
    .split(/\r?\n/)
    .map((name) => name.trim())
    .filter(Boolean);

  return names.length ? names : ["name"];
}

export function NationalDayThanksPDF({ data }: { data: NationalDayThanksData }) {
  const names = namesFromData(data);
  const introLine = text(data.introLine, "تتقدم إدارة مدرسة .. بالشكر والتقدير لـ");
  const message1 = text(data.message1, "يعجز البيان عن وصف قيمتك وأثرك على النشء شكرًا لك من القلب");
  const message2 = text(data.message2, "وبدورنا نقدم له هذا الشكر كتقدير لجهوده المبذولة");
  const message3 = text(data.message3, "سائلين الله لها مزيدًا من التفوق والنجاح");
  const optionalLine = text(data.optionalLine, "سطر اختياري");
  const teacherTitle = text(data.teacherTitle, "معلم المادة");
  const teacherName = text(data.teacherName, "فلان الفلاني");
  const principalTitle = text(data.principalTitle, "مدير المدرسة");
  const principalName = text(data.principalName, "فلان الفلاني");

  return (
    <Document>
      {names.map((recipientName, index) => (
        <Page key={`${recipientName}-${index}`} size={landscapeA4} style={s.page} wrap={false}>
          <View style={s.canvas}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={backgroundDataUri} style={s.background} />
            <View style={s.coverIntro} />
            <Text style={s.intro}>{introLine}</Text>
            <View style={s.nameBar} />
            <Text style={s.name}>{recipientName}</Text>
            <View style={s.coverNameBottom} />
            <View style={s.coverMessage} />
            <View style={s.messageBlock}>
              <Text style={s.messageLine}>{message1}</Text>
              <Text style={s.messageLine}>{message2}</Text>
              <Text style={s.messageLine}>{message3}</Text>
              <Text style={s.optionalLine}>{optionalLine}</Text>
            </View>
            <View style={s.coverPrincipalTitle} />
            <View style={s.coverPrincipalName} />
            <View style={s.coverTeacherTitle} />
            <View style={s.coverTeacherName} />
            <Text style={[s.signatureTitle, { left: 70 }]}>{principalTitle}</Text>
            <Text style={[s.signatureName, { left: 70 }]}>{principalName}</Text>
            <Text style={[s.signatureTitle, { left: 540 }]}>{teacherTitle}</Text>
            <Text style={[s.signatureName, { left: 540 }]}>{teacherName}</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
}
