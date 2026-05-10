"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "لوحة التحكم", icon: "◉" },
  { href: "/dashboard/reports", label: "التقارير", icon: "◉" },
  { href: "/dashboard/templates", label: "القوالب", icon: "◉" },
  { href: "/dashboard/analytics", label: "التحليلات", icon: "◉" },
  { href: "/dashboard/team", label: "الفريق", icon: "◉" },
  { href: "/dashboard/billing", label: "الفواتير", icon: "◉" },
  { href: "/dashboard/settings", label: "الإعدادات", icon: "◉" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "مستخدم";
  const userEmail = session?.user?.email ?? "";
  const userInitial = userName[0] ?? "م";
  const userImage = session?.user?.image;
  const today = new Date().toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-canvas-white">
      {/* Sidebar */}
      <aside className="w-64 bg-off-white-sage border-l border-faded-stone flex flex-col">
        <div className="p-6 border-b border-soft-concrete">
          <Link href="/" className="font-arabic text-2xl font-bold text-midnight-ink">
            تقارير تونتي
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-[140px] text-sm font-medium transition-colors",
                  isActive
                    ? "bg-action-black text-canvas-white"
                    : "text-gunmetal-gray hover:text-midnight-ink hover:bg-faded-stone"
                )}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-soft-concrete">
          <div className="flex items-center gap-3 px-4 py-3">
            {userImage ? (
              <img src={userImage} alt={userName} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-highlight-orange rounded-full flex items-center justify-center text-canvas-white font-bold">
                {userInitial}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-midnight-ink truncate">{userName}</div>
              <div className="text-xs text-gunmetal-gray truncate">{userEmail}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="w-full mt-2 px-4 py-2.5 text-sm text-gunmetal-gray hover:text-midnight-ink border border-soft-concrete rounded-[160px] hover:bg-faded-stone transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-faded-stone bg-canvas-white sticky top-0 z-10">
          <div>
            <h1 className="font-arabic text-xl font-semibold text-midnight-ink">مرحباً، {userName}</h1>
            <p className="text-sm text-gunmetal-gray">{today}</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="بحث..."
                className="w-48 px-4 py-2.5 bg-off-white-sage border border-soft-concrete rounded-[160px] text-sm text-midnight-ink placeholder:text-gunmetal-gray/50 focus:outline-none focus:border-highlight-orange"
              />
              <button className="absolute left-3 top-1/2 -translate-y-1/2 text-gunmetal-gray">🔍</button>
            </div>
            {/* Notifications */}
            <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-off-white-sage hover:bg-faded-stone transition-colors">
              <span className="text-lg">🔔</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-highlight-orange rounded-full border border-canvas-white"></span>
            </button>
            <Link
              href="/dashboard/reports/new/active-learning-initiative"
              className="px-5 py-2.5 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink transition-colors"
            >
              + تقرير جديد
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
