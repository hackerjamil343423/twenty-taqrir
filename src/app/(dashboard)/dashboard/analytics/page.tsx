"use client";

import { useState } from "react";

const monthlyData = [
  { month: "يناير", reports: 12 },
  { month: "فبراير", reports: 18 },
  { month: "مارس", reports: 24 },
  { month: "أبريل", reports: 15 },
  { month: "مايو", reports: 28 },
];

const templateUsage = [
  { name: "تقرير مبادرة تعليمية", count: 45, percentage: 32 },
  { name: "شهادة تقدير", count: 38, percentage: 27 },
  { name: "تقرير يوم الوطن", count: 28, percentage: 20 },
  { name: "خطة علاجية", count: 18, percentage: 13 },
  { name: "أخرى", count: 11, percentage: 8 },
];

const weeklyActivity = [
  { day: "سبت", reports: 5, templates: 2 },
  { day: "أحد", reports: 0, templates: 0 },
  { day: "إثن", reports: 8, templates: 3 },
  { day: "ثلاث", reports: 6, templates: 1 },
  { day: "أربع", reports: 12, templates: 4 },
  { day: "خمس", reports: 9, templates: 2 },
  { day: "جمع", reports: 3, templates: 1 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d");
  const maxReports = Math.max(...monthlyData.map((d) => d.reports));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-arabic text-2xl font-bold text-midnight-ink">التحليلات</h1>
          <p className="text-gunmetal-gray text-sm mt-1">إحصائيات وتقارير الأداء</p>
        </div>
        <div className="flex items-center gap-2 border border-soft-concrete rounded-[160px] p-1">
          {["7d", "30d", "90d", "1y"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-[160px] text-sm font-medium transition-colors ${
                period === p
                  ? "bg-action-black text-canvas-white"
                  : "text-gunmetal-gray hover:text-midnight-ink"
              }`}
            >
              {p === "7d" ? "7 أيام" : p === "30d" ? "30 يوم" : p === "90d" ? "90 يوم" : "سنة"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-off-white-sage rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">📊</span>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div className="font-arabic text-3xl font-bold text-midnight-ink mb-1">128</div>
          <div className="text-sm text-gunmetal-gray">إجمالي التقارير</div>
        </div>
        <div className="bg-off-white-sage rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">⚡</span>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
          </div>
          <div className="font-arabic text-3xl font-bold text-midnight-ink mb-1">87</div>
          <div className="text-sm text-gunmetal-gray">هذا الشهر</div>
        </div>
        <div className="bg-off-white-sage rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">👁</span>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+23%</span>
          </div>
          <div className="font-arabic text-3xl font-bold text-midnight-ink mb-1">1,247</div>
          <div className="text-sm text-gunmetal-gray">مشاهدات التقارير</div>
        </div>
        <div className="bg-off-white-sage rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">📤</span>
            <span className="text-xs text-highlight-orange bg-orange-100 px-2 py-1 rounded-full">جديد</span>
          </div>
          <div className="font-arabic text-3xl font-bold text-midnight-ink mb-1">245</div>
          <div className="text-sm text-gunmetal-gray">PDF محمّل</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reports Over Time */}
        <div className="bg-off-white-sage rounded-[32px] p-8">
          <h2 className="font-arabic text-lg font-semibold text-midnight-ink mb-6">التقارير الشهرية</h2>
          <div className="flex items-end justify-between gap-4 h-48">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-highlight-orange rounded-t-lg transition-all hover:bg-orange-500"
                  style={{ height: `${(data.reports / maxReports) * 100}%`, minHeight: "20px" }}
                />
                <span className="text-xs text-gunmetal-gray">{data.month}</span>
                <span className="text-xs font-medium text-midnight-ink">{data.reports}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Template Usage */}
        <div className="bg-off-white-sage rounded-[32px] p-8">
          <h2 className="font-arabic text-lg font-semibold text-midnight-ink mb-6">استخدام القوالب</h2>
          <div className="space-y-4">
            {templateUsage.map((item, index) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-midnight-ink">{item.name}</span>
                  <span className="text-sm text-gunmetal-gray">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-soft-concrete rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${index === 0 ? "bg-highlight-orange" : index === 1 ? "bg-orange-400" : index === 2 ? "bg-orange-300" : "bg-soft-concrete"}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-off-white-sage rounded-[32px] p-8">
        <h2 className="font-arabic text-lg font-semibold text-midnight-ink mb-6">النشاط الأسبوعي</h2>
        <div className="grid grid-cols-7 gap-4">
          {weeklyActivity.map((day) => (
            <div key={day.day} className="text-center">
              <div className="text-xs text-gunmetal-gray mb-2">{day.day}</div>
              <div
                className="mx-auto rounded-lg mb-2"
                style={{
                  height: "60px",
                  backgroundColor: day.reports > 0 ? `rgba(255, 153, 0, ${day.reports / 15})` : "#f3efeb",
                }}
              />
              <div className="text-xs text-gunmetal-gray">{day.reports} تقرير</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-off-white-sage rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-soft-concrete">
          <h2 className="font-arabic text-lg font-semibold text-midnight-ink">النشاط الأخير</h2>
        </div>
        <div className="divide-y divide-soft-concrete">
          {[
            { action: "تم إنشاء تقرير جديد", item: "تقرير يوم الأرض", time: "منذ 5 دقائق", type: "create" },
            { action: "تم تحميل PDF", item: "شهادة تقدير - فاطمة", time: "منذ 30 دقيقة", type: "download" },
            { action: "تمت مشاركة تقرير", item: "خطة علاجية", time: "منذ ساعة", type: "share" },
            { action: "تم تحديث قالب", item: "تقرير مبادرة التعلم", time: "منذ 3 ساعات", type: "update" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-5 hover:bg-faded-stone/30 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === "create" ? "bg-green-100 text-green-600" :
                activity.type === "download" ? "bg-blue-100 text-blue-600" :
                activity.type === "share" ? "bg-purple-100 text-purple-600" :
                "bg-yellow-100 text-yellow-600"
              }`}>
                {activity.type === "create" ? "✓" : activity.type === "download" ? "↓" : activity.type === "share" ? "↗" : "↻"}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-midnight-ink">{activity.action}</div>
                <div className="text-xs text-gunmetal-gray">{activity.item}</div>
              </div>
              <span className="text-xs text-gunmetal-gray">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}