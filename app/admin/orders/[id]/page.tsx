"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  order_number: string | null;
  customer_name: string | null;
  phone: string | null;
  project_type: string | null;
  scale: string | null;
  message: string | null;
  admin_memo: string | null;
  file_name: string | null;
  file_path: string | null;
  status: string | null;
  created_at: string;
};

const statusOptions = [
  "접수",
  "입금대기",
  "디자인 확인",
  "제작중",
  "배송중",
  "완료",
  "취소",
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("접수");
  const [adminMemo, setAdminMemo] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error) {
      console.error(error);
      alert("주문 정보를 불러오지 못했습니다.");
      return;
    }

    setOrder(data);
    setStatus(data.status ?? "접수");
    setAdminMemo(data.admin_memo ?? "");
    setLoading(false);
  };

  const saveChanges = async () => {
    const { error } = await supabase
      .from("orders")
      .update({
        status,
        admin_memo: adminMemo,
      })
      .eq("id", orderId);

    if (error) {
      console.error(error);
      alert("저장에 실패했습니다.");
      return;
    }

    alert("저장되었습니다.");
    fetchOrder();
  };

  const downloadFile = async () => {
  if (!order?.file_path) {
    alert("첨부파일이 없습니다.");
    return;
  }

  const normalizedPath = order.file_path.startsWith("orders/")
    ? order.file_path
    : `orders/${order.file_path}`;

  console.log("다운로드 경로:", normalizedPath);

  const { data, error } = await supabase.storage
    .from("order-files")
    .createSignedUrl(normalizedPath, 60);

  if (error) {
    console.error("파일 다운로드 오류:", error);
    alert(`파일 다운로드 링크를 만들지 못했습니다: ${error.message}`);
    return;
  }

  window.open(data.signedUrl, "_blank", "noopener,noreferrer");
};

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
        불러오는 중...
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
        주문을 찾을 수 없습니다.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <Link href="/admin/orders" className="text-yellow-400 font-bold">
          ← 주문 목록으로
        </Link>

        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-yellow-400 font-black">
              {order.order_number || order.id}
            </p>
            <h1 className="text-4xl md:text-5xl font-black mt-2">
              주문 상세
            </h1>
          </div>

          <button
            onClick={saveChanges}
            className="bg-yellow-400 text-black px-6 py-4 rounded-xl font-black"
          >
            변경사항 저장
          </button>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_0.42fr] gap-8">
          <div className="bg-white text-black rounded-3xl p-8">
            <h2 className="text-2xl font-black mb-6">주문 정보</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <Info
                label="접수일"
                value={new Date(order.created_at).toLocaleString("ko-KR")}
              />
              <Info label="주문번호" value={order.order_number || order.id} />
              <Info label="고객명" value={order.customer_name} />
              <Info label="연락처" value={order.phone} />
              <Info label="상품" value={order.project_type} />
              <Info label="규모" value={order.scale} />
            </div>

            <div className="mt-6">
              <p className="font-bold text-neutral-500">고객 요청사항</p>
              <div className="mt-2 bg-neutral-100 rounded-xl p-4 min-h-[120px] whitespace-pre-wrap">
                {order.message || "-"}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-bold text-neutral-500">첨부파일</p>
              <p className="mt-2 break-all">{order.file_name || "파일 없음"}</p>

              <button
                onClick={downloadFile}
                className="mt-4 bg-black text-white px-5 py-3 rounded-xl font-bold"
              >
                파일 다운로드
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-yellow-400 text-black rounded-3xl p-8">
              <h2 className="text-2xl font-black">주문 상태</h2>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-6 w-full border-2 border-black rounded-xl p-3 font-bold"
              >
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="bg-white text-black rounded-3xl p-8">
              <h2 className="text-2xl font-black">관리자 메모</h2>

              <textarea
                value={adminMemo}
                onChange={(e) => setAdminMemo(e.target.value)}
                className="mt-5 w-full border rounded-xl p-4 min-h-[220px]"
                placeholder="고객 통화 내용, 입금 확인, 제작 주의사항 등을 기록하세요."
              />

              <button
                onClick={saveChanges}
                className="mt-5 w-full bg-black text-white py-4 rounded-xl font-black"
              >
                메모 저장
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="font-bold text-neutral-500">{label}</p>
      <p className="mt-2 font-bold break-all">{value || "-"}</p>
    </div>
  );
}