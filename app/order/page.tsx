"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
const KAKAO_CHAT_URL = "https://pf.kakao.com/_FhxkPX";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function OrderPage() {
  const trackKakaoClick = () => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "conversion", {
      send_to: "AW-18299011325/Nv3RCN-xhMwcEP2B05VE",
      value: 1.0,
      currency: "KRW",
    });
  };

  const [product, setProduct] = useState("현수막");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!customerName || !phone) {
      alert("고객명과 연락처를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const orderNumber = `INW-${new Date()
        .toISOString()
        .slice(2, 10)
        .replaceAll("-", "")}-${Date.now().toString().slice(-4)}`;

      let filePath = "";
      let fileName = "";

      if (file) {
        fileName = file.name;

        const extension = file.name.includes(".")
          ? file.name.split(".").pop()
          : "bin";

        const safeFileName = `order-file-${Date.now()}.${extension}`;
        const storagePath = `orders/${safeFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("order-files")
          .upload(storagePath, file, {
            contentType: file.type || "application/octet-stream",
          });

        if (uploadError) {
          throw uploadError;
        }

        filePath = storagePath;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName,
          phone,
          project_type: product,
          scale: `${width}cm x ${height}cm / ${quantity}개`,
          message,
          file_name: fileName,
          file_path: filePath,
          order_number: orderNumber,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.message || "주문 저장 실패");
      }

      alert("주문이 접수되었습니다.");

      setProduct("현수막");
      setWidth("");
      setHeight("");
      setQuantity("");
      setCustomerName("");
      setPhone("");
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("주문 접수 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAFAF7] via-[#F7F8F3] to-[#EEF2EA] text-[#1F261B]">
      <header className="sticky top-0 z-50 border-b border-[#62764B]/15 bg-[#FAFAF7]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <a
            href="/"
            className="text-2xl font-black tracking-tight text-[#26331E]"
          >
            INWOOAD
          </a>

          <nav className="hidden md:flex gap-8 text-sm text-[#687160]">
            <a href="/" className="hover:text-[#62764B] transition">
              홈
            </a>
            <a href="/portfolio" className="hover:text-[#62764B] transition">
              제작사례
            </a>
            <a href="/quote" className="hover:text-[#62764B] transition">
              견적문의
            </a>
            <a href="/order" className="text-[#62764B] font-bold">
              온라인주문
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute -top-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-[#62764B]/20 blur-[140px]" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[#C8D2BE]/50 blur-[130px]" />
        <div className="absolute left-1/2 top-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/70 blur-[170px]" />

        <div className="relative max-w-4xl mx-auto">
          <p className="text-[#62764B] font-bold">ONLINE ORDER</p>

          <h1 className="text-4xl md:text-5xl font-black mt-3 text-[#1F261B]">
            온라인 주문
          </h1>

          <p className="mt-4 text-[#687160]">
            상품을 선택하고 사이즈와 수량을 입력하면 주문을 진행할 수 있습니다.
          </p>

          <div className="mt-10 bg-white/85 text-[#1F261B] rounded-3xl p-8 border border-[#62764B]/15 shadow-sm">
            <label className="block font-bold text-[#26331E]">상품 선택</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
            >
              <option>현수막</option>
              <option>배너</option>
              <option>폼보드</option>
              <option>광고 POP</option>
            </select>

            <label className="block font-bold mt-5 text-[#26331E]">
              고객명
            </label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
              placeholder="예: 김인우"
            />

            <label className="block font-bold mt-5 text-[#26331E]">
              연락처
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
              placeholder="예: 010-0000-0000"
            />

            <div className="grid md:grid-cols-3 gap-4 mt-5">
              <div>
                <label className="block font-bold text-[#26331E]">
                  가로(cm)
                </label>
                <input
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                  placeholder="예: 500"
                />
              </div>

              <div>
                <label className="block font-bold text-[#26331E]">
                  세로(cm)
                </label>
                <input
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                  placeholder="예: 90"
                />
              </div>

              <div>
                <label className="block font-bold text-[#26331E]">수량</label>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                  placeholder="예: 1"
                />
              </div>
            </div>

            <label className="block font-bold mt-5 text-[#26331E]">
              요청사항
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg min-h-[120px] outline-none focus:border-[#62764B]"
              placeholder="제작 요청사항을 적어주세요."
            />

            <label className="block font-bold mt-5 text-[#26331E]">
              디자인 파일 업로드
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-[#62764B] file:px-4 file:py-2 file:font-bold file:text-white"
            />

            {file && (
              <p className="mt-3 text-sm text-[#687160]">
                선택된 파일: {file.name}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 w-full bg-[#62764B] text-white py-4 rounded-xl font-bold shadow-sm hover:bg-[#52663E] transition disabled:bg-[#AAB4A0] disabled:cursor-not-allowed"
            >
              {loading ? "접수 중..." : "주문 접수하기"}
            </button>
          </div>
        </div>
      </section>
            <a
        href={KAKAO_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackKakaoClick}
        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          items-center
          gap-4
          rounded-full
          bg-[#FEE500]
          px-7
          py-5
          text-black
          shadow-[0_15px_40px_rgba(0,0,0,0.35)]
          hover:scale-105
          transition-all
          duration-300
        "
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-3xl">
          💬
        </div>

        <div>
          <p className="text-xs font-semibold opacity-70">
            사진만 보내도 빠른 견적
          </p>

          <p className="text-xl font-black">
            카카오톡 상담하기
          </p>
        </div>
      </a>
    </main>
  );
}