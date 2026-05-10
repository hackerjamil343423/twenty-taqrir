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
  { id: "initiatives", label: "مبادرات تعليمية", count: 10 },
  { id: "events", label: "تقارير المناسبات", count: 14 },
  { id: "programs", label: "برامج وأنشطة", count: 4 },
  { id: "development", label: "تطوير مهني", count: 5 },
  { id: "strategies", label: "استراتيجيات تدريس", count: 3 },
  { id: "parent", label: "تواصل أولياء الأمور", count: 3 },
  { id: "performance", label: "أداء الطلاب", count: 4 },
  { id: "remediation", label: "خطط علاجية وإثرائية", count: 3 },
  { id: "resources", label: "تقنية ومصادر", count: 3 },
  { id: "certificates", label: "شهادات", count: 9 },
  { id: "records", label: "سجلات وكشوف", count: 2 },
  { id: "surveys", label: "استبانات", count: 3 },
  { id: "classroom", label: "إدارة صفية", count: 3 },
  { id: "environment", label: "بيئة تعلم", count: 3 },
  { id: "assessment", label: "تنوع التقويم", count: 2 },
  { id: "job", label: "أداء وظيفي", count: 3 },
];

const commonFields: TemplateField[] = [
  { id: "title", label: "عنوان التقرير", type: "text", required: true, placeholder: "اكتب عنوان التقرير" },
  { id: "date", label: "تاريخ التنفيذ", type: "date", required: true },
  {
    id: "subject",
    label: "المادة الدراسية",
    type: "select",
    options: [
      { value: "math", label: "الرياضيات" },
      { value: "science", label: "العلوم" },
      { value: "arabic", label: "اللغة العربية" },
      { value: "english", label: "اللغة الإنجليزية" },
      { value: "other", label: "أخرى" },
    ],
  },
  { id: "grade", label: "الصف الدراسي", type: "text", placeholder: "مثال: الصف الخامس" },
  { id: "goal", label: "الهدف", type: "textarea", required: true },
  { id: "description", label: "الوصف", type: "textarea", required: true },
  { id: "results", label: "النتائج", type: "textarea" },
  { id: "evidence", label: "الشواهد والمرفقات", type: "file" },
];

export const catalogTemplates: CatalogTemplate[] = [
  {
    name: "تقرير مبادرة التعلم النشط",
    slug: "active-learning-initiative",
    description: "قالب رسمي لتوثيق مبادرات التعلم النشط مع الهدف، خطوات التنفيذ، الشواهد، والنتائج.",
    category: "initiatives",
    fields: [
      ...commonFields,
      {
        id: "tools",
        label: "الأدوات المستخدمة",
        type: "multiselect",
        options: [
          { value: "worksheets", label: "أوراق عمل" },
          { value: "presentations", label: "عروض تقديمية" },
          { value: "videos", label: "فيديوهات تعليمية" },
          { value: "games", label: "ألعاب تعليمية" },
        ],
      },
      { id: "impactRating", label: "تقييم الأثر", type: "rating" },
    ],
    pdfConfig: { layout: "ministry-standard", sections: ["metadata", "goal", "description", "tools", "results"] },
    price: 0,
    rating: 4.9,
    usageCount: 1234,
    featured: true,
  },
  {
    name: "تقرير اليوم الوطني",
    slug: "national-day-report",
    description: "توثيق فعاليات اليوم الوطني بصياغة رسمية وشواهد وصور.",
    category: "events",
    fields: commonFields,
    pdfConfig: { layout: "event" },
    price: 0,
    rating: 4.7,
    usageCount: 892,
    featured: true,
  },
  {
    name: "شهادة تقدير طالب",
    slug: "student-certificate",
    description: "شهادة تقدير قابلة للتخصيص للطلاب والطالبات.",
    category: "certificates",
    fields: [
      { id: "studentName", label: "اسم الطالب/الطالبة", type: "text", required: true },
      { id: "reason", label: "سبب التكريم", type: "textarea", required: true },
      { id: "date", label: "تاريخ الإصدار", type: "date", required: true },
      { id: "issuer", label: "اسم المعلم/القائد", type: "text", required: true },
    ],
    pdfConfig: { layout: "certificate" },
    price: 5,
    rating: 4.8,
    usageCount: 2341,
    featured: true,
  },
  {
    name: "خطة علاجية للطالب",
    slug: "student-remediation-plan",
    description: "خطة علاجية منظمة تتضمن جوانب الضعف، الإجراءات، ومؤشرات التحسن.",
    category: "remediation",
    fields: [
      ...commonFields,
      {
        id: "actions",
        label: "الإجراءات العلاجية",
        type: "table",
        columns: [
          { key: "weakness", label: "جانب الضعف" },
          { key: "action", label: "الإجراء" },
          { key: "date", label: "التاريخ", type: "date" },
        ],
      },
    ],
    pdfConfig: { layout: "plan" },
    price: 15,
    rating: 5,
    usageCount: 456,
    featured: true,
  },
  {
    name: "استبانة رضا أولياء الأمور",
    slug: "parent-satisfaction-survey",
    description: "نموذج استبانة مختصر مع ملخص نتائج قابل للتصدير.",
    category: "surveys",
    fields: [
      { id: "title", label: "عنوان الاستبانة", type: "text", required: true },
      { id: "audience", label: "الفئة المستهدفة", type: "text" },
      { id: "questions", label: "الأسئلة", type: "table", columns: [{ key: "question", label: "السؤال" }] },
      { id: "summary", label: "ملخص النتائج", type: "textarea" },
    ],
    pdfConfig: { layout: "survey" },
    price: 10,
    rating: 4.5,
    usageCount: 567,
  },
];

export function getCatalogTemplate(slug: string) {
  return catalogTemplates.find((template) => template.slug === slug);
}

export function getCategoryLabel(category: string) {
  return templateCategories.find((item) => item.id === category)?.label || category;
}
