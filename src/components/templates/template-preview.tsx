"use client";

import { Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useMemo, useState } from "react";

type FieldValue = string | string[] | number | Record<string, string>[];

type TemplatePreviewProps = {
  layout: unknown;
  values: Record<string, FieldValue>;
};

const studentPages = ["الغلاف", "المتابعة", "الحضور"];

function stringValue(values: Record<string, FieldValue>, key: string, fallback: string) {
  const value = values[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function namesValue(values: Record<string, FieldValue>) {
  const value = values.studentNames;
  const names =
    typeof value === "string"
      ? value
          .split(/\r?\n/)
          .map((name) => name.trim())
          .filter(Boolean)
      : [];

  return names.length ? names : ["name"];
}

export function TemplatePreview({ layout, values }: TemplatePreviewProps) {
  const [zoom, setZoom] = useState(0.48);
  const [large, setLarge] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const names = useMemo(() => namesValue(values), [values]);
  const isCertificate = layout === "national-day-thanks-certificate";
  const pageLabels = isCertificate ? names.map((_, index) => `شهادة ${index + 1}`) : studentPages;
  const boundedPageIndex = Math.min(pageIndex, pageLabels.length - 1);

  const preview = (
    <PreviewStage zoom={zoom} onOpen={() => setLarge(true)}>
      {isCertificate ? (
        <CertificatePreview values={values} name={names[boundedPageIndex] ?? names[0]} />
      ) : (
        <StudentRecordPreview values={values} pageIndex={boundedPageIndex} />
      )}
    </PreviewStage>
  );

  return (
    <>
      <section className="w-full rounded-[8px] border border-[#d7e5e1] bg-[#f8fbfa] p-3" dir="rtl">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((value) => Math.max(0.3, value - 0.08))}
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#c8dad5] bg-white text-[#0b756d]"
              title="تصغير"
            >
              <Minus size={17} />
            </button>
            <button
              type="button"
              onClick={() => setZoom((value) => Math.min(1.25, value + 0.08))}
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#c8dad5] bg-white text-[#0b756d]"
              title="تكبير"
            >
              <Plus size={17} />
            </button>
            <button
              type="button"
              onClick={() => setZoom(0.48)}
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#c8dad5] bg-white text-[#0b756d]"
              title="إعادة الضبط"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={() => setLarge(true)}
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#c8dad5] bg-white text-[#0b756d]"
              title="عرض كبير"
            >
              <Maximize2 size={16} />
            </button>
          </div>
          <select
            value={boundedPageIndex}
            onChange={(event) => setPageIndex(Number(event.target.value))}
            className="h-9 rounded-[6px] border border-[#c8dad5] bg-white px-3 text-sm text-[#31514d] outline-none"
          >
            {pageLabels.map((label, index) => (
              <option key={`${label}-${index}`} value={index}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {preview}
      </section>

      {large && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" dir="rtl">
          <div className="relative max-h-full max-w-full overflow-auto rounded-[8px] bg-[#f8fbfa] p-4">
            <button
              type="button"
              onClick={() => setLarge(false)}
              className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-[6px] bg-white text-[#0b756d] shadow"
              title="إغلاق"
            >
              <X size={18} />
            </button>
            <PreviewStage zoom={0.95}>
              {isCertificate ? (
                <CertificatePreview values={values} name={names[boundedPageIndex] ?? names[0]} />
              ) : (
                <StudentRecordPreview values={values} pageIndex={boundedPageIndex} />
              )}
            </PreviewStage>
          </div>
        </div>
      )}
    </>
  );
}

function PreviewStage({
  zoom,
  children,
  onOpen,
}: {
  zoom: number;
  children: React.ReactNode;
  onOpen?: () => void;
}) {
  return (
    <div className="w-full overflow-auto rounded-[6px] bg-[#dfe9e6] p-3">
      <button
        type="button"
        onClick={onOpen}
        className="block cursor-zoom-in border-0 bg-transparent p-0"
        style={{ width: 842 * zoom, height: 595 * zoom }}
      >
        <div
          className="relative h-[595px] w-[842px] origin-top-right overflow-hidden bg-white text-right shadow-sm"
          style={{ transform: `scale(${zoom})` }}
        >
          {children}
        </div>
      </button>
    </div>
  );
}

function CertificatePreview({ values, name }: { values: Record<string, FieldValue>; name: string }) {
  const introLine = stringValue(values, "introLine", "تتقدم إدارة مدرسة .. بالشكر والتقدير لـ");
  const message1 = stringValue(values, "message1", "يعجز البيان عن وصف قيمتك وأثرك على النشء شكرًا لك من القلب");
  const message2 = stringValue(values, "message2", "وبدورنا نقدم له هذا الشكر كتقدير لجهوده المبذولة");
  const message3 = stringValue(values, "message3", "سائلين الله لها مزيدًا من التفوق والنجاح");
  const optionalLine = stringValue(values, "optionalLine", "سطر اختياري");
  const teacherTitle = stringValue(values, "teacherTitle", "معلم المادة");
  const teacherName = stringValue(values, "teacherName", "فلان الفلاني");
  const principalTitle = stringValue(values, "principalTitle", "مدير المدرسة");
  const principalName = stringValue(values, "principalName", "فلان الفلاني");

  return (
    <div className="absolute inset-0 font-[Cairo]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/templates/national-day-thanks-bg.png" alt="" className="absolute inset-0 h-full w-full" />
      <div className="absolute left-[210px] top-[210px] h-[33px] w-[422px] bg-white" />
      <div className="absolute left-[170px] top-[213px] w-[502px] text-center text-[28px] font-bold leading-tight text-black">
        {introLine}
      </div>
      <div className="absolute left-[201px] top-[245px] h-[36px] w-[455px] rounded-[7px] bg-[#459b3f]" />
      <div className="absolute left-[201px] top-[247px] w-[455px] text-center text-[30px] font-bold leading-[36px] text-white">
        {name}
      </div>
      <div className="absolute left-[210px] top-[282px] h-[14px] w-[422px] bg-white" />
      <div className="absolute left-[135px] top-[296px] h-[84px] w-[572px] bg-white" />
      <div className="absolute left-[100px] top-[298px] w-[642px] text-center text-[28px] font-bold leading-[1.45] text-black">
        <div>{message1}</div>
        <div>{message2}</div>
        <div>{message3}</div>
        <div className="mt-1 text-[22px]">{optionalLine}</div>
      </div>
      <div className="absolute left-[78px] top-[416px] h-[36px] w-[200px] bg-white" />
      <div className="absolute left-[78px] top-[470px] h-[38px] w-[200px] bg-white" />
      <div className="absolute left-[535px] top-[416px] h-[36px] w-[220px] bg-white" />
      <div className="absolute left-[555px] top-[470px] h-[34px] w-[165px] bg-white" />
      <div className="absolute left-[70px] top-[418px] w-[205px] text-center text-[30px] font-bold text-[#088577]">
        {principalTitle}
      </div>
      <div className="absolute left-[70px] top-[476px] w-[205px] text-center text-[30px] font-bold text-black">
        {principalName}
      </div>
      <div className="absolute left-[540px] top-[418px] w-[205px] text-center text-[30px] font-bold text-[#088577]">
        {teacherTitle}
      </div>
      <div className="absolute left-[540px] top-[476px] w-[205px] text-center text-[30px] font-bold text-black">
        {teacherName}
      </div>
    </div>
  );
}

function StudentRecordPreview({ values, pageIndex }: { values: Record<string, FieldValue>; pageIndex: number }) {
  if (pageIndex === 0) {
    return <StudentCoverPreview values={values} />;
  }

  return pageIndex === 1 ? <StudentFollowPreview values={values} /> : <StudentAttendancePreview values={values} />;
}

function StudentCoverPreview({ values }: { values: Record<string, FieldValue> }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white font-[Cairo] text-black">
      <PreviewWaves />
      <div className="absolute left-[150px] top-[40px] w-[130px] text-right text-[20px] font-bold leading-[2]">
        <div>{stringValue(values, "educationOffice", "مكتب التعليم")}</div>
        <div>{stringValue(values, "schoolName", "اسم المدرسة")}</div>
      </div>
      <div className="absolute right-[78px] top-[34px] w-[260px] text-right text-[20px] font-bold leading-[1.7]">
        <div>المملكة العربية السعودية</div>
        <div>وزارة التعليم</div>
        <div>الإدارة العامة للتعليم {stringValue(values, "region", "بمنطقة ...")}</div>
      </div>
      <div className="absolute left-[125px] top-[195px] flex h-[64px] w-[600px] items-center justify-center rounded-bl-[58px] rounded-tr-[42px] bg-[#178f84]">
        <div className="text-[48px] font-bold leading-none text-white">كشف متابعة الطلاب</div>
      </div>
      <div className="absolute left-[250px] right-[250px] top-[290px] text-center text-[40px] text-[#f48b2d]">
        مقرر فيزياء ١
      </div>
      <div className="absolute bottom-[92px] left-[130px] w-[200px] text-right text-[20px] font-bold">
        <div className="mb-8">مدير المدرسة :</div>
        <div>{stringValue(values, "principalName", "name")}</div>
      </div>
      <div className="absolute bottom-[92px] right-[120px] w-[230px] text-right text-[20px] font-bold">
        <div className="mb-8">إعداد المعلم :</div>
        <div>{stringValue(values, "teacherName", "name")}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[16px] bg-[#18bcb0]" />
    </div>
  );
}

function StudentFollowPreview({ values }: { values: Record<string, FieldValue> }) {
  const names = namesValue(values).slice(0, 15);
  const rows = Array.from({ length: 15 }, (_, index) => names[index] ?? "");
  const headers = ["المهام الأدائية", "المشاركة و التفاعل", "الاختبارات القصيرة", "الدرجة النهائية"];

  return (
    <div className="absolute inset-0 bg-white font-[Cairo] text-black">
      <StudentTitle title="كشف متابعة الطلاب" />
      <ClassText values={values} />
      <div className="absolute left-[18px] right-[210px] top-[78px] flex h-[54px] flex-row-reverse items-center rounded-bl-[24px] rounded-tl-[24px] bg-[#2b73a0] px-5">
        {headers.map((header, index) => (
          <div key={header} className={`text-center text-[15px] font-bold leading-tight text-white ${index === 3 ? "flex-[0.5]" : "flex-1"}`}>
            {header}
          </div>
        ))}
      </div>
      <div className="absolute right-[58px] top-[104px] w-[120px] text-center text-[20px] font-bold">اسم الطالب</div>
      <StudentNames rows={rows} top={145} />
      <div className="absolute left-[62px] right-[225px] top-[145px] flex flex-row-reverse justify-between">
        {Array.from({ length: 8 }).map((_, column) => (
          <div key={column} className="flex w-[60px] flex-col items-center">
            {Array.from({ length: 15 }).map((__, row) => (
              <div key={row} className="flex h-[32px] items-center justify-center">
                {column === 7 ? (
                  <div className="h-[20px] w-[20px] rounded-full border-[1.2px] border-[#f48b2d]" />
                ) : column >= 4 ? (
                  <div className="h-[19px] w-[19px] rounded-full bg-[#d6d8d8]" />
                ) : (
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((___, dot) => (
                      <div key={dot} className="h-[9px] w-[9px] rounded-full bg-[#d6d8d8]" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentAttendancePreview({ values }: { values: Record<string, FieldValue> }) {
  const names = namesValue(values).slice(0, 15);
  const rows = Array.from({ length: 15 }, (_, index) => names[index] ?? "");

  return (
    <div className="absolute inset-0 bg-white font-[Cairo] text-black">
      <StudentTitle title="سجل الحضور اليومي للطلاب" />
      <ClassText values={values} className="left-[275px] top-[74px]" />
      <div className="absolute bottom-[30px] left-[46px] right-[32px] top-[94px] rounded-bl-[34px] rounded-tr-[34px] border-2 border-[#2b73a0]" />
      <div className="absolute right-[70px] top-[110px] w-[95px] border-b-[5px] border-[#18bcb0] text-center text-[18px] font-bold">
        اسم الطالب
      </div>
      <StudentNames rows={rows} top={145} />
      <div className="absolute left-[78px] right-[220px] top-[140px] flex flex-row-reverse justify-between">
        {Array.from({ length: 13 }).map((_, week) => (
          <div key={week} className="w-[42px] text-center">
            <div className="mb-3 text-[11px] font-bold leading-tight">الأسبوع<br />{week + 1}</div>
            {Array.from({ length: 15 }).map((__, row) => (
              <div key={row} className="mb-[10px] flex justify-center gap-1">
                <div className="h-[9px] w-[9px] rounded-full bg-[#d6d8d8]" />
                <div className="h-[9px] w-[9px] rounded-full bg-[#d6d8d8]" />
                <div className="h-[9px] w-[9px] rounded-full bg-[#d6d8d8]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentTitle({ title }: { title: string }) {
  return (
    <div className="absolute right-[28px] top-[12px] flex h-[54px] w-[470px] items-center justify-center rounded-bl-[42px] rounded-tr-[34px] bg-[#178f84]">
      <div className="text-[34px] font-bold text-white">{title}</div>
    </div>
  );
}

function ClassText({ values, className = "left-[112px] top-[40px]" }: { values: Record<string, FieldValue>; className?: string }) {
  return (
    <div className={`absolute w-[230px] text-right text-[16px] font-bold text-[#333] ${className}`}>
      الشعبة : {stringValue(values, "className", "name")}
    </div>
  );
}

function StudentNames({ rows, top }: { rows: string[]; top: number }) {
  return (
    <div className="absolute right-[32px] w-[168px]" style={{ top }}>
      {rows.map((name, index) => (
        <div key={index} className="mb-[2px] flex h-[30px] flex-row-reverse items-center">
          <div className="ml-[7px] flex h-[20px] w-[20px] items-center justify-center rounded-full border-[1.2px] border-[#f48b2d] text-[11px] font-bold text-[#f48b2d]">
            {index + 1}
          </div>
          <div className="flex h-[20px] w-[132px] items-center justify-end rounded-full border-[1.2px] border-[#178f84] px-2 text-[11px] font-bold">
            {name}
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewWaves() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 842 595" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={`top-${i}`}
          d={`M -60 ${10 + i * 8} C 120 ${25 + i * 8}, 165 ${190 + i * 3}, 330 ${126 + i * 5} S 455 ${-30 + i * 6}, 610 ${30 + i * 5}`}
          stroke="#d8d8d8"
          strokeWidth="1"
          fill="none"
          opacity="0.55"
        />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <path
          key={`right-${i}`}
          d={`M 790 ${105 + i * 9} C 700 ${150 + i * 9}, 725 ${285 + i * 7}, 815 ${365 + i * 7}`}
          stroke="#e1e1e1"
          strokeWidth="1"
          fill="none"
          opacity="0.45"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={`bottom-${i}`}
          d={`M 185 ${560 - i * 7} C 330 ${495 - i * 2}, 500 ${595 - i * 8}, 720 ${555 - i * 3}`}
          stroke="#dfdfdf"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}
