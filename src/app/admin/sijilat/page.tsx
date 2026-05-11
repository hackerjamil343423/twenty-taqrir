import { db } from "@/lib/db";
import { getCatalogTemplate } from "@/lib/template-catalog";
import Link from "next/link";
import { CopyButton } from "./copy-button";
import { DeleteButton } from "./delete-button";
import { headers } from "next/headers";

export default async function SijilListPage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const sijilat = await db.sijil.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-midnight-ink">روابط النماذج</h1>
          <p className="text-sm text-gunmetal-gray mt-1">{sijilat.length} رابط</p>
        </div>
        <Link
          href="/admin/sijilat/new"
          className="px-6 py-2.5 bg-midnight-ink text-white text-sm font-medium rounded-[160px] hover:opacity-80 transition-opacity"
        >
          + إنشاء رابط من قالب جاهز
        </Link>
      </div>

      {sijilat.length === 0 ? (
        <div className="bg-white rounded-[20px] p-16 text-center">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-gunmetal-gray mb-4">لا توجد روابط بعد</p>
          <Link
            href="/admin/sijilat/new"
            className="text-sm text-highlight-orange hover:underline"
          >
            أنشئ أول رابط من قالب جاهز ←
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-[20px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-faded-stone">
                <th className="text-right text-xs font-medium text-gunmetal-gray px-6 py-4">عنوان الرابط</th>
                <th className="text-right text-xs font-medium text-gunmetal-gray px-6 py-4">القالب الجاهز</th>
                <th className="text-right text-xs font-medium text-gunmetal-gray px-6 py-4">الرابط</th>
                <th className="text-right text-xs font-medium text-gunmetal-gray px-6 py-4">التنزيلات</th>
                <th className="text-right text-xs font-medium text-gunmetal-gray px-6 py-4">التاريخ</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {sijilat.map((sijil) => {
                const template = getCatalogTemplate(sijil.templateSlug);
                const url = `${baseUrl}/s/${sijil.token}`;
                return (
                  <tr key={sijil.id} className="border-b border-faded-stone last:border-0 hover:bg-off-white-sage transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-midnight-ink text-sm">{sijil.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-faded-stone text-gunmetal-gray px-2 py-1 rounded-[6px]">
                        {template?.name ?? sijil.templateSlug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <CopyButton url={url} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-midnight-ink font-medium">
                        {sijil.usageCount.toLocaleString("ar-SA")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gunmetal-gray">
                        {new Date(sijil.createdAt).toLocaleDateString("ar-SA")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <DeleteButton id={sijil.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
