import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { error } = await supabase
    .from("orders")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Health check 실패:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    checkedAt: new Date().toISOString(),
  });
}