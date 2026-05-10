import Link from "next/link";
import { LogoutButton } from "./logout-button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-off-white-sage">
      <header className="bg-white border-b border-faded-stone sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-midnight-ink rounded-[6px] flex items-center justify-center">
                <span className="text-white font-bold text-sm">ت</span>
              </div>
              <span className="font-bold text-midnight-ink">تقارير</span>
            </div>
            <nav className="flex gap-6">
              <Link
                href="/admin"
                className="text-sm text-gunmetal-gray hover:text-midnight-ink transition-colors"
              >
                الرئيسية
              </Link>
              <Link
                href="/admin/sijilat"
                className="text-sm text-gunmetal-gray hover:text-midnight-ink transition-colors"
              >
                السجلات
              </Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
