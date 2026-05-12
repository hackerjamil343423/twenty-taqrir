export type FieldOption = {
  value: string;
  label: string;
};

export type TemplateField = {
  id: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "multiselect"
    | "checkbox"
    | "radio"
    | "date"
    | "number"
    | "file"
    | "table"
    | "rating";
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  columns?: { key: string; label: string; type?: "text" | "number" | "date" }[];
};

export type CatalogTemplate = {
  name: string;
  slug: string;
  description: string;
  category: string;
  fields: TemplateField[];
  pdfConfig: Record<string, unknown>;
  thumbnail?: string;
  price: number;
  rating: number;
  usageCount: number;
  featured?: boolean;
};

export const templateCategories = [
  { id: "records", label: "سجلات وكشوف", count: 1 },
  { id: "certificates", label: "شهادات", count: 1 },
];

export const catalogTemplates: CatalogTemplate[] = [
  {
    name: "كشف متابعة الطلاب",
    slug: "student-follow-up-record",
    description: "نموذج مطبوع لكشف متابعة الطلاب وسجل الحضور اليومي بتصميم مطابق للنموذج المرجعي.",
    category: "records",
    fields: [
      {
        id: "studentNames",
        label: "اكتب الأسماء ليتم تحميلها",
        type: "textarea",
        required: true,
        placeholder: "اكتب (الصق) الأسماء هنا (كل اسم في سطر )",
      },
      { id: "region", label: "بمنطقة ...", type: "text", placeholder: "بمنطقة ..." },
      { id: "educationOffice", label: "مكتب التعليم", type: "text", placeholder: "مكتب التعليم" },
      { id: "schoolName", label: "اسم المدرسة", type: "text", placeholder: "اسم المدرسة" },
      { id: "className", label: "الشعبة / الفصل", type: "text", placeholder: "الشعبة / الفصل" },
      { id: "teacherName", label: "معلم المادة", type: "text", placeholder: "معلم المادة" },
      { id: "principalName", label: "مدير المدرسة", type: "text", placeholder: "مدير المدرسة" },
    ],
    pdfConfig: { layout: "student-follow-up-record" },
    price: 0,
    rating: 5,
    usageCount: 886,
    featured: true,
  },
  {
    name: "شهادة شكر فارغة لكتابة النصوص",
    slug: "national-day-thanks-certificate",
    description: "شهادة شكر بتصميم اليوم الوطني؛ اكتب العبارات مرة واحدة ثم الصق الأسماء لإنتاج الشهادات.",
    category: "certificates",
    fields: [
      {
        id: "introLine",
        label: "العبارة الافتتاحية",
        type: "text",
        required: true,
        placeholder: "تتقدم إدارة مدرسة .. بالشكر والتقدير لـ",
      },
      {
        id: "studentNames",
        label: "الأسماء",
        type: "textarea",
        required: true,
        placeholder: "اكتب (الصق) الأسماء هنا (كل اسم في سطر )",
      },
      {
        id: "message1",
        label: "السطر الأول",
        type: "text",
        required: true,
        placeholder: "يعجز البيان عن وصف قيمتك وأثرك على النشء شكرًا لك من القلب",
      },
      {
        id: "message2",
        label: "السطر الثاني",
        type: "text",
        required: true,
        placeholder: "وبدورنا نقدم له هذا الشكر كتقدير لجهوده المبذولة",
      },
      {
        id: "message3",
        label: "السطر الثالث",
        type: "text",
        required: true,
        placeholder: "سائلين الله لها مزيدًا من التفوق والنجاح",
      },
      { id: "optionalLine", label: "سطر اختياري", type: "text", placeholder: "سطر اختياري" },
      { id: "teacherTitle", label: "معلم المادة", type: "text", placeholder: "معلم المادة" },
      { id: "teacherName", label: "اسم معلم المادة", type: "text", placeholder: "فلان الفلاني" },
      { id: "principalTitle", label: "مدير المدرسة", type: "text", placeholder: "مدير المدرسة" },
      { id: "principalName", label: "اسم مدير المدرسة", type: "text", placeholder: "فلان الفلاني" },
    ],
    pdfConfig: { layout: "national-day-thanks-certificate" },
    price: 0,
    rating: 5,
    usageCount: 886,
    featured: true,
  },
];

export function getCatalogTemplate(slug: string) {
  return catalogTemplates.find((template) => template.slug === slug);
}

export function getCategoryLabel(category: string) {
  return templateCategories.find((item) => item.id === category)?.label || category;
}
