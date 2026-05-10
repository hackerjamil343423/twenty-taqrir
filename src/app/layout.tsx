import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "تقارير | Taqriri",
  description: "منصة إنشاء السجلات التعليمية بمعايير وزارة التعليم السعودية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-canvas-white text-midnight-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
