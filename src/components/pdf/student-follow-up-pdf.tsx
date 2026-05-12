import path from "path";
import { Document, Font, Page, StyleSheet, Svg, Path, Text, View } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

const fontsDir = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Cairo",
  fonts: [
    { src: path.join(fontsDir, "Cairo-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Cairo-Bold.ttf"), fontWeight: 700 },
  ],
});

type StudentFollowUpData = {
  studentNames?: unknown;
  region?: unknown;
  educationOffice?: unknown;
  schoolName?: unknown;
  className?: unknown;
  teacherName?: unknown;
  principalName?: unknown;
};

const teal = "#178f84";
const blue = "#2b73a0";
const orange = "#f48b2d";
const paleDot = "#d6d8d8";
const landscapeA4 = { width: 842, height: 595 };

const s = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  canvas: {
    width: 842,
    height: 595,
    fontFamily: "Cairo",
    color: "#111111",
    padding: 0,
  },
  coverHeaderRight: {
    position: "absolute",
    top: 34,
    right: 78,
    width: 260,
    textAlign: "right",
  },
  coverTopLeft: {
    position: "absolute",
    top: 40,
    left: 150,
    width: 130,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 2,
  },
  ministryLine: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 4,
  },
  heroBar: {
    position: "absolute",
    top: 195,
    left: 125,
    width: 600,
    height: 64,
    backgroundColor: teal,
    borderTopRightRadius: 42,
    borderBottomLeftRadius: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 1,
  },
  coverSubtitle: {
    position: "absolute",
    top: 290,
    left: 250,
    right: 250,
    textAlign: "center",
    color: orange,
    fontSize: 28,
    fontWeight: 400,
  },
  signatureLeft: {
    position: "absolute",
    bottom: 92,
    left: 130,
    width: 200,
    textAlign: "right",
  },
  signatureRight: {
    position: "absolute",
    bottom: 92,
    right: 120,
    width: 230,
    textAlign: "right",
  },
  sigLabel: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 28,
  },
  sigName: {
    fontSize: 13,
    fontWeight: 700,
  },
  bottomTeal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: "#18bcb0",
  },
  sheetTitleBar: {
    position: "absolute",
    top: 12,
    right: 28,
    width: 470,
    height: 54,
    backgroundColor: teal,
    borderTopRightRadius: 34,
    borderBottomLeftRadius: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 700,
  },
  classLine: {
    position: "absolute",
    top: 40,
    left: 112,
    width: 230,
    textAlign: "right",
    fontSize: 12,
    fontWeight: 700,
    color: "#333333",
  },
  followHeader: {
    position: "absolute",
    top: 78,
    left: 18,
    right: 210,
    height: 54,
    backgroundColor: blue,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerGroup: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: 700,
    lineHeight: 1.15,
    textAlign: "center",
  },
  nameColumnTitle: {
    position: "absolute",
    top: 104,
    right: 58,
    width: 120,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 700,
  },
  listArea: {
    position: "absolute",
    top: 145,
    right: 32,
    width: 168,
  },
  numberCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: orange,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },
  numberText: {
    color: orange,
    fontSize: 8,
    fontWeight: 700,
  },
  studentPill: {
    width: 132,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: teal,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  studentName: {
    fontSize: 8,
    fontWeight: 700,
    textAlign: "right",
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    height: 30,
    marginBottom: 2,
  },
  followGrid: {
    position: "absolute",
    top: 145,
    left: 62,
    right: 225,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  attendanceFrame: {
    position: "absolute",
    top: 94,
    left: 46,
    right: 32,
    bottom: 30,
    borderWidth: 2,
    borderColor: blue,
    borderTopRightRadius: 34,
    borderBottomLeftRadius: 34,
    paddingTop: 40,
  },
  attendanceNamesTitle: {
    position: "absolute",
    top: 110,
    right: 70,
    width: 95,
    textAlign: "center",
    fontSize: 13,
    fontWeight: 700,
    borderBottomWidth: 5,
    borderBottomColor: "#18bcb0",
  },
  attendanceGrid: {
    position: "absolute",
    top: 140,
    left: 78,
    right: 220,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  weekTitle: {
    fontSize: 8,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 8,
  },
  dotRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 10,
    justifyContent: "center",
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: paleDot,
  },
  bigDot: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: paleDot,
  },
});

function value(input: unknown, fallback = "name") {
  return typeof input === "string" && input.trim() ? input.trim() : fallback;
}

function namesFromData(data: StudentFollowUpData) {
  const raw = typeof data.studentNames === "string" ? data.studentNames : "";
  return raw
    .split(/\r?\n/)
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 15);
}

function Waves() {
  return (
    <Svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="842"
      height="595"
      viewBox="0 0 842 595"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <Path
          key={`top-${i}`}
          d={`M -60 ${10 + i * 8} C 120 ${25 + i * 8}, 165 ${190 + i * 3}, 330 ${126 + i * 5} S 455 ${-30 + i * 6}, 610 ${30 + i * 5}`}
          stroke="#d8d8d8"
          strokeWidth="1"
          fill="none"
          opacity={0.55}
        />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <Path
          key={`right-${i}`}
          d={`M 790 ${105 + i * 9} C 700 ${150 + i * 9}, 725 ${285 + i * 7}, 815 ${365 + i * 7}`}
          stroke="#e1e1e1"
          strokeWidth="1"
          fill="none"
          opacity={0.45}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <Path
          key={`bottom-${i}`}
          d={`M 185 ${560 - i * 7} C 330 ${495 - i * 2}, 500 ${595 - i * 8}, 720 ${555 - i * 3}`}
          stroke="#dfdfdf"
          strokeWidth="1"
          fill="none"
          opacity={0.5}
        />
      ))}
    </Svg>
  );
}

function StudentRows({ names }: { names: string[] }) {
  const rows = Array.from({ length: 15 }, (_, index) => names[index] ?? "");
  return (
    <View style={s.listArea}>
      {rows.map((name, index) => (
        <View key={index} style={s.row}>
          <View style={s.numberCircle}>
            <Text style={s.numberText}>{index + 1}</Text>
          </View>
          <View style={s.studentPill}>
            <Text style={s.studentName}>{name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function FollowGrid() {
  const groups = [
    { title: "المهام الأدائية", columns: 2, dots: 5 },
    { title: "المشاركة والتفاعل", columns: 2, dots: 5 },
    { title: "الاختبارات القصيرة", columns: 3, dots: 1 },
    { title: "الدرجة النهائية", columns: 1, dots: 1, orange: true },
  ];

  return (
    <View style={s.followGrid}>
      {groups.flatMap((group, groupIndex) =>
        Array.from({ length: group.columns }).map((_, colIndex) => (
          <View key={`${groupIndex}-${colIndex}`} style={{ alignItems: "center", width: group.dots === 5 ? 68 : 44 }}>
            {Array.from({ length: 15 }).map((__, rowIndex) => (
              <View key={rowIndex} style={{ height: 32, justifyContent: "center" }}>
                {group.orange ? (
                  <View style={[s.numberCircle, { marginLeft: 0 }]} />
                ) : group.dots === 5 ? (
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    {Array.from({ length: 5 }).map((___, dotIndex) => (
                      <View key={dotIndex} style={s.dot} />
                    ))}
                  </View>
                ) : (
                  <View style={s.bigDot} />
                )}
              </View>
            ))}
          </View>
        ))
      )}
    </View>
  );
}

function AttendanceGrid() {
  const weeks = [
    "الأسبوع الأول",
    "الأسبوع الثاني",
    "الأسبوع الثالث",
    "الأسبوع الرابع",
    "الأسبوع الخامس",
    "الأسبوع السادس",
    "الأسبوع السابع",
    "الأسبوع الثامن",
    "الأسبوع التاسع",
    "الأسبوع العاشر",
    "الأسبوع الحادي عشر",
    "الأسبوع الثاني عشر",
    "الأسبوع الثالث عشر",
  ];

  return (
    <View style={s.attendanceGrid}>
      {weeks.map((week) => (
        <View key={week} style={{ alignItems: "center", width: 42 }}>
          <Text style={s.weekTitle}>{week}</Text>
          {Array.from({ length: 15 }).map((_, rowIndex) => (
            <View key={rowIndex} style={s.dotRow}>
              <View style={s.dot} />
              <View style={s.dot} />
              <View style={s.dot} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function ClassLine({ className, style }: { className: string; style?: Style }) {
  return <Text style={style ? [s.classLine, style] : s.classLine}>الشعبة : {className}</Text>;
}

export function StudentFollowUpPDF({ data }: { data: StudentFollowUpData }) {
  const names = namesFromData(data);
  const className = value(data.className, "name");
  const teacherName = value(data.teacherName, "name");
  const principalName = value(data.principalName, "name");
  const region = value(data.region, "name");
  const office = value(data.educationOffice, "name");
  const school = value(data.schoolName, "name");

  return (
    <Document>
      <Page size={landscapeA4} style={s.page} wrap={false}>
        <View style={s.canvas}>
        <Waves />
        <View style={s.coverTopLeft}>
          <Text>{office}</Text>
          <Text>{school}</Text>
        </View>
        <View style={s.coverHeaderRight}>
          <Text style={s.ministryLine}>المملكة العربية السعودية</Text>
          <Text style={s.ministryLine}>وزارة التعليم</Text>
          <Text style={s.ministryLine}>الإدارة العامة للتعليم {region}</Text>
        </View>
        <View style={s.heroBar}>
          <Text style={s.heroTitle}>كشف متابعة الطلاب</Text>
        </View>
        <Text style={s.coverSubtitle}>مقرر فيزياء ١</Text>
        <View style={s.signatureLeft}>
          <Text style={s.sigLabel}>مدير المدرسة :</Text>
          <Text style={s.sigName}>{principalName}</Text>
        </View>
        <View style={s.signatureRight}>
          <Text style={s.sigLabel}>إعداد المعلم :</Text>
          <Text style={s.sigName}>{teacherName}</Text>
        </View>
        <View style={s.bottomTeal} />
        </View>
      </Page>

      <Page size={landscapeA4} style={s.page} wrap={false}>
        <View style={s.canvas}>
        <View style={s.sheetTitleBar}>
          <Text style={s.sheetTitle}>كشف متابعة الطلاب</Text>
        </View>
        <ClassLine className={className} />
        <View style={s.followHeader}>
          {["المهام الأدائية", "المشاركة و التفاعل", "الاختبارات القصيرة", "الدرجة النهائية"].map((label) => (
            <View key={label} style={[s.headerGroup, { flex: label === "الدرجة النهائية" ? 0.5 : 1 }]}>
              <Text style={s.headerText}>{label}</Text>
            </View>
          ))}
        </View>
        <Text style={s.nameColumnTitle}>اسم الطالب</Text>
        <StudentRows names={names} />
        <FollowGrid />
        </View>
      </Page>

      <Page size={landscapeA4} style={s.page} wrap={false}>
        <View style={s.canvas}>
        <View style={s.sheetTitleBar}>
          <Text style={s.sheetTitle}>سجل الحضور اليومي للطلاب</Text>
        </View>
        <ClassLine className={className} style={{ top: 74, left: 275 }} />
        <View style={s.attendanceFrame} />
        <Text style={s.attendanceNamesTitle}>اسم الطالب</Text>
        <StudentRows names={names} />
        <AttendanceGrid />
        </View>
      </Page>
    </Document>
  );
}
