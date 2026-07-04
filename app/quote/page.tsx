"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const KAKAO_CHAT_URL = "https://pf.kakao.com/_FhxkPX";

export default function QuotePage() {
  const [company, setCompany] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("건설현장 펜스");
  const [location, setLocation] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [scale, setScale] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showKakaoModal, setShowKakaoModal] = useState(false);

  const handleSubmit = async () => {
    if (!customerName || !phone) {
      alert("담당자명과 연락처를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const orderNumber = `QUO-${new Date()
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

        const safeFileName = `quote-file-${Date.now()}.${extension}`;
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

      const fullMessage = `
[견적 문의]

회사명 / 단체명: ${company || "-"}
담당자명: ${customerName}
연락처: ${phone}
이메일: ${email || "-"}
프로젝트 종류: ${projectType}
설치 지역: ${location || "-"}
희망 납기일: ${dueDate || "-"}
예상 수량 / 규모: ${scale || "-"}

[요청사항]
${message || "-"}
      `.trim();

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName,
          phone,
          project_type: `[견적문의] ${projectType}`,
          scale: scale || "맞춤 견적 문의",
          message: fullMessage,
          file_name: fileName,
          file_path: filePath,
          order_number: orderNumber,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.message || "견적 문의 저장 실패");
      }

      setShowKakaoModal(true);

      setCompany("");
      setCustomerName("");
      setPhone("");
      setEmail("");
      setProjectType("건설현장 펜스");
      setLocation("");
      setDueDate("");
      setScale("");
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("견적 문의 접수 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAFAF7] via-[#F7F8F3] to-[#EEF2EA] text-[#1F261B]">
      {showKakaoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 text-center text-[#1F261B] shadow-2xl border border-[#62764B]/15">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FEE500] text-3xl">
              💬
            </div>

            <h2 className="text-2xl font-black">견적 문의가 접수되었습니다</h2>

            <p className="mt-4 text-sm leading-6 text-[#687160]">
              담당자가 문의 내용을 확인하고 있습니다.
              <br />
              <br />
              <strong className="text-[#26331E]">
                정확한 견적 금액, 입금계좌 및 제작 일정 안내는 카카오톡 상담을
                시작하신 후 진행됩니다.
              </strong>
              <br />
              <br />
              빠른 안내를 위해 아래 버튼을 눌러 상담을 시작해 주세요.
            </p>

            <a
              href={KAKAO_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-2xl bg-[#FEE500] px-6 py-4 text-center text-lg font-black text-black hover:brightness-95 transition"
            >
              💬 카카오톡 상담 시작하기
            </a>

            <button
              onClick={() => setShowKakaoModal(false)}
              className="mt-4 text-xs text-[#687160] underline"
            >
              나중에 상담하기
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-[#62764B]/15 bg-[#FAFAF7]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-[#26331E]"
          >
            INWOOAD
          </Link>

          <nav className="hidden md:flex gap-8 text-sm text-[#687160]">
            <Link href="/" className="hover:text-[#62764B] transition">
              홈
            </Link>
            <Link href="/portfolio" className="hover:text-[#62764B] transition">
              제작사례
            </Link>
            <Link href="/quote" className="text-[#62764B] font-bold">
              견적문의
            </Link>
            <Link href="/order" className="hover:text-[#62764B] transition">
              온라인주문
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute -top-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-[#62764B]/20 blur-[140px]" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[#C8D2BE]/50 blur-[130px]" />
        <div className="absolute left-1/2 top-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/70 blur-[170px]" />

        <div className="relative max-w-6xl mx-auto">
          <p className="text-[#62764B] font-bold">CUSTOM QUOTE</p>

          <h1 className="text-4xl md:text-6xl font-black mt-3 text-[#1F261B] leading-tight">
            프로젝트 견적 문의
          </h1>

          <p className="mt-5 text-lg text-[#687160] max-w-3xl">
            공사장 펜스, 행사장 가림막, 대형 현수막, 매장 내부 연출 등 규모
            있는 제작은 상담 후 맞춤 견적으로 안내드립니다.
          </p>

          <div className="grid lg:grid-cols-[1fr_0.45fr] gap-10 mt-12">
            <div className="bg-white/85 text-[#1F261B] rounded-3xl p-8 border border-[#62764B]/15 shadow-sm">
              <h2 className="text-3xl font-black text-[#26331E]">
                견적 문의 정보
              </h2>

              <div className="grid md:grid-cols-2 gap-5 mt-8">
                <div>
                  <label className="block font-bold text-[#26331E]">
                    회사명 / 단체명
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                    placeholder="예: 인우애드"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#26331E]">
                    담당자명
                  </label>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                    placeholder="예: 김인우"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#26331E]">
                    연락처
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                    placeholder="예: 010-0000-0000"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#26331E]">
                    이메일
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                    placeholder="예: example@email.com"
                  />
                </div>
              </div>

              <label className="block font-bold mt-6 text-[#26331E]">
                프로젝트 종류
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
              >
                <option>건설현장 펜스</option>
                <option>대형 현수막</option>
                <option>행사장 가림막</option>
                <option>매장 내부 연출</option>
                <option>시트지 / POP</option>
                <option>기타</option>
              </select>

              <div className="grid md:grid-cols-2 gap-5 mt-6">
                <div>
                  <label className="block font-bold text-[#26331E]">
                    설치 지역
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                    placeholder="예: 서울 강남구"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#26331E]">
                    희망 납기일
                  </label>
                  <input
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                    placeholder="예: 7월 15일까지"
                  />
                </div>
              </div>

              <label className="block font-bold mt-6 text-[#26331E]">
                예상 수량 / 규모
              </label>
              <input
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg outline-none focus:border-[#62764B]"
                placeholder="예: 펜스 200m, 현수막 30장, 배너 20개"
              />

              <label className="block font-bold mt-6 text-[#26331E]">
                요청사항
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full border border-[#62764B]/20 bg-[#FAFAF7] p-3 rounded-lg min-h-[160px] outline-none focus:border-[#62764B]"
                placeholder="제작 목적, 설치 위치, 참고사항, 원하는 분위기 등을 적어주세요."
              />

              <label className="block font-bold mt-6 text-[#26331E]">
                참고 파일 업로드
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
                {loading ? "접수 중..." : "견적 문의 접수하기"}
              </button>
            </div>

            <aside className="space-y-5">
              <div className="bg-white/80 border border-[#62764B]/20 rounded-3xl p-7 shadow-sm">
                <p className="text-[#62764B] font-bold">
                  빠른 상담 및 제작 문의
                </p>

                <p className="mt-3 text-3xl font-black text-[#26331E]">
                  010-6313-7345
                </p>

                <p className="mt-3 text-[#687160]">평일 09:00 ~ 18:00</p>
              </div>

              <div className="bg-[#FEE500] text-black rounded-3xl p-7 shadow-sm">
                <h3 className="text-2xl font-black">카카오톡 상담</h3>

                <p className="mt-3">
                  사진, 도면, 참고 이미지를 보내주시면 더 빠르게 견적 안내가
                  가능합니다.
                </p>

                <a
                  href={KAKAO_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-[#26331E] transition"
                >
                  카카오톡으로 문의하기
                </a>
              </div>

              <div className="bg-[#26331E] text-white rounded-3xl p-7 shadow-sm">
                <h3 className="text-2xl font-black">견적 안내 절차</h3>

                <ol className="mt-5 space-y-4 text-white/85">
                  <li>1. 문의 내용 확인</li>
                  <li>2. 제작 가능 여부 검토</li>
                  <li>3. 견적 및 일정 안내</li>
                  <li>4. 제작 및 시공 진행</li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <a
        href={KAKAO_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-4 rounded-full bg-[#FEE500] px-7 py-5 text-black shadow-[0_15px_40px_rgba(0,0,0,0.35)] hover:scale-105 transition-all duration-300"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-3xl">
          💬
        </div>

        <div>
          <p className="text-xs font-semibold opacity-70">
            사진만 보내도 빠른 견적
          </p>

          <p className="text-xl font-black">카카오톡 상담하기</p>
        </div>
      </a>
    </main>
  );
}