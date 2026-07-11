import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { sendAdminSms } from "../../../lib/solapi";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: body.customer_name,
        phone: body.phone,
        project_type: body.project_type,
        scale: body.scale,
        message: body.message,
        file_name: body.file_name,
        file_path: body.file_path,
        order_number: body.order_number,
        status: "접수",
      })
      .select()
      .single();

    if (error) throw error;

    console.log("새 주문 접수:", order);

    try {
  // await sendAdminSms(order);
} catch (smsError) {
  console.error("관리자 문자 발송 실패:", smsError);
}

    return NextResponse.json({ ok: true, order });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { ok: false, message: "주문 접수 실패" },
      { status: 500 }
    );
  }
}