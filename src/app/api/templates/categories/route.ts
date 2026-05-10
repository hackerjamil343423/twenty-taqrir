import { NextResponse } from "next/server";
import { templateCategories } from "@/lib/template-catalog";

export async function GET() {
  return NextResponse.json({ categories: templateCategories });
}
