"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  order_number: string | null;
  customer_name: string | null;
  phone: string | null;
  project_type: string | null;
  scale: string | null;
  status: string | null;
  created_at: string;
  file_name: string | null;
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("주문 목록을 불러오지 못했습니다.");
      setLoading(false);
      return;
    }

    setOrders(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/admin/login");
        return;
      }

      fetchOrders();
    };

    checkAdmin();
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAFAF7] via-[#F7F8F3] to-[#EEF2EA] text-[#1F261B] px-6 py-12">
      <div className="relative max-w-7xl mx-auto">
        <div className="absolute -top-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-[#62764B]/20 blur-[140px]" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[#C8D2BE]/50 blur-[130px]" />

        <div className="relative">
          <Link href="/" className="text-[#62764B] font-bold hover:text-[#52663E] transition">
            ← INWOOAD 홈으로
          </Link>

          <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-end gap-5">
            <div>
              <p className="text-[#62764B] font-bold mb-3">ADMIN ORDERS</p>

              <h1 className="text-4xl md:text-5xl font-black text-[#1F261B]">
                주문 관리자
              </h1>

              <p className="mt-4 text-[#687160]">
                주문을 클릭하면 상세 내용, 상태, 관리자 메모를 확인할 수 있습니다.
              </p>
            </div>

            <button
              onClick={fetchOrders}
              className="bg-[#62764B] text-white px-5 py-3 rounded-xl font-black shadow-sm hover:bg-[#52663E] transition"
            >
              새로고침
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="bg-white/75 border border-[#62764B]/15 rounded-2xl p-5 shadow-sm">
              <p className="text-[#687160] text-sm font-bold">전체 주문</p>
              <p className="text-3xl font-black mt-2 text-[#26331E]">
                {orders.length}
              </p>
            </div>

            <div className="bg-white/75 border border-[#62764B]/15 rounded-2xl p-5 shadow-sm">
              <p className="text-[#687160] text-sm font-bold">접수</p>
              <p className="text-3xl font-black mt-2 text-[#26331E]">
                {orders.filter((o) => o.status === "접수").length}
              </p>
            </div>

            <div className="bg-white/75 border border-[#62764B]/15 rounded-2xl p-5 shadow-sm">
              <p className="text-[#687160] text-sm font-bold">제작중</p>
              <p className="text-3xl font-black mt-2 text-[#26331E]">
                {orders.filter((o) => o.status === "제작중").length}
              </p>
            </div>

            <div className="bg-white/75 border border-[#62764B]/15 rounded-2xl p-5 shadow-sm">
              <p className="text-[#687160] text-sm font-bold">완료</p>
              <p className="text-3xl font-black mt-2 text-[#26331E]">
                {orders.filter((o) => o.status === "완료").length}
              </p>
            </div>
          </div>

          <div className="mt-10 bg-white/85 text-[#1F261B] rounded-3xl overflow-hidden border border-[#62764B]/15 shadow-sm">
            {loading ? (
              <div className="p-8 font-bold text-[#687160]">
                불러오는 중...
              </div>
            ) : orders.length === 0 ? (
              <div className="p-8 font-bold text-[#687160]">
                접수된 주문이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#EEF2EA] text-[#26331E]">
                    <tr>
                      <th className="p-4">주문번호</th>
                      <th className="p-4">접수일</th>
                      <th className="p-4">고객명</th>
                      <th className="p-4">연락처</th>
                      <th className="p-4">상품</th>
                      <th className="p-4">상태</th>
                      <th className="p-4">상세</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-t border-[#62764B]/10 hover:bg-[#F7F8F3] transition"
                      >
                        <td className="p-4 font-black whitespace-nowrap">
                          {order.order_number || order.id.slice(0, 8)}
                        </td>

                        <td className="p-4 whitespace-nowrap text-[#687160]">
                          {new Date(order.created_at).toLocaleString("ko-KR")}
                        </td>

                        <td className="p-4 font-bold whitespace-nowrap">
                          {order.customer_name || "-"}
                        </td>

                        <td className="p-4 whitespace-nowrap text-[#687160]">
                          {order.phone || "-"}
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          {order.project_type || "-"}
                        </td>

                        <td className="p-4">
                          <span className="bg-[#62764B]/12 text-[#52663E] px-3 py-1 rounded-full font-bold text-sm whitespace-nowrap border border-[#62764B]/20">
                            {order.status || "접수"}
                          </span>
                        </td>

                        <td className="p-4">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="bg-[#26331E] text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap hover:bg-[#62764B] transition"
                          >
                            상세보기
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}