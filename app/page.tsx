"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const KAKAO_CHAT_URL = "https://pf.kakao.com/_FhxkPX";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}


export default function Home() {
  const trackKakaoClick = () => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "conversion", {
      send_to: "AW-18299011325/Nv3RCN-xhMwcEP2B05VE",
      value: 1.0,
      currency: "KRW",
    });
  };

  const products = [
    ["현수막", "사이즈 입력 후 바로 주문", "가장 많이 주문", "/products/sign.png"],
    ["배너", "행사·전시·매장 홍보", "거치대 선택 가능", "/products/banner.png"],
    ["폼보드", "실내 안내·홍보 패널", "A3 · A2 · A1", "/products/foamboard.png"],
    ["광고 POP", "매장 홍보용 출력물", "소량 제작 가능", "/products/pop.png"],
  ];

  const services = [
    {
      title: "팝업 · 전시 공간",
      desc: "팝업스토어, 전시 공간, 포토존 등 공간에 어울리는 출력물을 제작합니다.",
      image: "/services/popup.png",
      href: "/portfolio#popup",
    },
    {
      title: "기업 · 학교 · 기관 행사",
      desc: "기업 행사, 학교 축제, 기관 행사 등 다양한 현장 출력물을 제작합니다.",
      image: "/services/event.png",
      href: "/portfolio#event",
    },
    {
      title: "건설현장 펜스",
      desc: "건설현장 가림막, 펜스 광고, 현장 안내 사인물 등을 제작합니다.",
      image: "/services/fence.png",
      href: "/portfolio#fence",
    },
    {
      title: "제작부터 시공까지",
      desc: "자체 장비를 통해 직접 제작하고 설치까지 한 번에 책임지고 진행합니다.",
      image: "/services/production.png",
      href: "/portfolio#production",
    },
  ];

  const priceMap: Record<string, number | null> = {
    현수막: 10000,
    배너: 20000,
    폼보드: 25000,
    "광고 POP": null,
  };

  const [selectedProduct, setSelectedProduct] = useState("현수막");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("1");

  const estimate = useMemo(() => {
    const unitPrice = priceMap[selectedProduct];
    const w = Number(width);
    const h = Number(height);
    const q = Number(quantity);

    if (!unitPrice || !w || !h || !q) return null;

    const area = (w / 100) * (h / 100);
    const total = Math.ceil(area * unitPrice * q);

    return {
      area,
      total,
    };
  }, [selectedProduct, width, height, quantity]);

  const orderHref = `/order?product=${encodeURIComponent(selectedProduct)}`;

  return (
    <main className="min-h-screen bg-[#F8F7F1] text-[#1F2A24]">
      <header className="border-b border-[#D8DCCB] bg-[#F8F7F1]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#1F2A24]">
            INWOOAD
          </Link>

          <nav className="hidden md:flex gap-8 text-sm text-[#4B554A]">
            <a href="#services" className="hover:text-[#4F5F3A] transition">
              서비스소개
            </a>
            <Link href="/portfolio" className="hover:text-[#4F5F3A] transition">
              제작사례
            </Link>
            <Link href="/quote" className="hover:text-[#4F5F3A] transition">
              견적문의
            </Link>
            <Link href="/order" className="hover:text-[#4F5F3A] transition">
              온라인주문
            </Link>
            <Link
              href="/admin/login"
              className="text-[#34412F] font-bold hover:text-[#6F7D4F] transition"
            >
              관리자
            </Link>
          </nav>
        </div>
      </header>

      <section
  className="
    relative
    overflow-hidden
    py-28
    bg-gradient-to-b
    from-[#FAFAF7]
    via-[#F7F8F3]
    to-[#EEF2EA]
  "
>
  {/* 은은한 격자 패턴 */}
  <div
    className="absolute inset-0 opacity-[0.12]"
    style={{
      backgroundImage: `
        linear-gradient(#34412F 1px, transparent 1px),
        linear-gradient(90deg, #34412F 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
    }}
  />

  {/* 오른쪽 위 카키 빛 */}
  <div className="absolute -top-40 right-[-120px] h-[700px] w-[700px] rounded-full bg-[#62764B]/20 blur-[150px]" />

  {/* 왼쪽 아래 연한 그린 */}
  <div className="absolute bottom-[-180px] left-[-120px] h-[500px] w-[500px] rounded-full bg-[#C8D2BE]/50 blur-[140px]" />

  {/* 가운데 은은한 빛 */}
  <div className="absolute left-1/2 top-10 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-white/70 blur-[180px]" />

  {/* 내용 */}
  <div className="relative z-10 max-w-6xl mx-auto px-6">
    <p className="text-[#4F5F3A] font-bold mb-4">
      행사 · 전시 · 매장 공간 제작 전문
    </p>

    <h1 className="text-5xl md:text-7xl font-black leading-tight">
      공간을 더 돋보이게 만드는
      <br />
      출력물 제작 · 시공
    </h1>

    <p className="mt-6 text-2xl md:text-3xl font-bold">
      실사출력부터 공간 연출까지
    </p>

    <p className="mt-5 text-xl text-[#5F695C]">
      25년 이상의 경력으로 기업 행사부터 팝업스토어, 매장 브랜딩까지 제작과 설치를 한 번에 제공합니다.
      <br />
      합리적인 가격과 높은 품질의 서비스를 보장합니다.
    </p>

    <div className="mt-10 flex flex-wrap gap-4 items-stretch">
      <Link
        href="/quote"
        className="flex items-center justify-center bg-[#34412F] text-white text-lg px-7 py-4 rounded-xl font-bold min-w-[170px] hover:bg-[#4F5F3A] transition"
      >
        맞춤 견적 문의
      </Link>

      <Link
        href="/portfolio"
        className="flex items-center justify-center border border-[#34412F]/40 text-[#34412F] text-lg px-7 py-4 rounded-xl font-bold min-w-[170px] hover:bg-[#34412F] hover:text-white transition"
      >
        제작 사례 보기
      </Link>

      <Link
        href="/order"
        className="flex items-center justify-center border border-[#34412F]/40 text-[#34412F] text-lg px-7 py-4 rounded-xl font-bold min-w-[170px] hover:bg-[#34412F] hover:text-white transition"
      >
        온라인 주문
      </Link>

      <div className="flex items-center gap-4 border border-[#4F5F3A] text-[#34412F] text-lg px-8 py-4 rounded-xl font-bold bg-white/70">
        <span className="text-2xl">📞</span>
        <span>
          <span className="block text-sm opacity-80">
            빠른 상담 및 제작 문의
          </span>
          <span className="block text-xl font-black">
            010-6313-7345
          </span>
        </span>
      </div>

      <a
        href={KAKAO_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackKakaoClick}
        className="flex items-center justify-center bg-[#34412F] text-white px-7 py-4 rounded-xl font-black min-w-[190px] hover:bg-[#4F5F3A] transition"
      >
        💬 카카오톡 상담하기
      </a>
    </div>
  </div>

  {/* 아래 섹션으로 자연스럽게 연결 */}
  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#F8F7F1]" />
</section>

      <section id="services" className="bg-[#EEF0E7] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#4F5F3A] font-bold mb-3">서비스 영역</p>

          <h2 className="text-3xl md:text-4xl font-black">
            공간을 완성하는 실사출력 솔루션
          </h2>

          <p className="mt-4 text-[#6B7467] text-lg">
            팝업스토어, 전시, 행사, 건설현장 펜스까지 제작부터 시공까지 한 번에 제공합니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative overflow-hidden rounded-3xl h-[340px] border border-[#D8DCCB] block"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                />

                <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                <div className="absolute top-[38%] left-1/2 -translate-x-1/2 z-20 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="translate-y-4 rounded-xl bg-[#F8F7F1] px-7 py-4 font-black text-[#34412F] shadow-xl transition-all duration-300 group-hover:translate-y-0">
                    자세히 보기 →
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                  <h3 className="text-3xl md:text-4xl font-black leading-tight break-keep text-white">
                    {service.title}
                  </h3>

                  <p className="mt-5 text-lg text-white/90 leading-relaxed break-keep">
                    {service.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#34412F] to-[#5F7044] rounded-3xl p-10 md:p-14 text-white">
            <p className="font-bold text-sm text-white/90">
              팝업 · 전시 · 행사 · 매장 · 건설현장 펜스
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              프로젝트를 준비 중이신가요?
            </h2>

            <p className="mt-5 text-lg max-w-3xl text-white/90">
              현장 목적에 맞는 출력물 제작부터 설치까지 상황에 맞게 안내드립니다.
              필요한 내용만 간단히 남겨주시면 확인 후 견적으로 안내드리겠습니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="bg-white text-[#34412F] px-8 py-4 rounded-xl font-bold hover:bg-[#F8F7F1] transition"
              >
                견적 문의
              </Link>

              <Link
                href="/portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#34412F] transition"
              >
                제작 사례 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F7F1] py-20 border-t border-[#D8DCCB]">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.3fr_0.7fr] gap-10">
          <div>
            <p className="text-[#4F5F3A] font-bold mb-3">간편 주문 서비스</p>

            <h2 className="text-3xl md:text-4xl font-black">
              소형 출력물도 전문적으로 제작합니다
            </h2>

            <p className="mt-4 text-[#6B7467] text-lg">
              현수막, 배너, POP 등 기본 제작물도 합리적인 가격 대비 높은 품질로 제작해 드립니다.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mt-10">
              {products.map(([title, desc, badge, image]) => (
                <Link
                  key={title}
                  href={`/order?product=${title}`}
                  className="group relative overflow-hidden text-left border border-[#D8DCCB] rounded-3xl p-8 min-h-[200px] hover:border-[#4F5F3A] transition block"
                >
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-70 transition duration-300"
                  />

                  <div className="absolute inset-0 bg-black/35" />

                  <div className="relative z-10 h-full min-h-[140px] flex flex-col justify-center">
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">
                        {title}
                      </h3>

                      <span className="shrink-0 text-sm bg-white/20 text-white px-4 py-2 rounded-full">
                        {badge}
                      </span>
                    </div>

                    <p className="mt-4 text-lg text-white/90 drop-shadow">
                      {desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white text-[#1F2A24] rounded-3xl p-6 h-fit border border-[#D8DCCB] shadow-sm">
            <p className="text-sm font-bold text-[#6B7467]">
              간단 예상 제작비 확인
            </p>

            <h3 className="text-2xl font-black mt-1">
              기본 금액 빠르게 확인
            </h3>

            <label className="block font-bold mt-5">상품 선택</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="mt-2 w-full border border-[#D8DCCB] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F5F3A]"
            >
              <option>현수막</option>
              <option>배너</option>
              <option>폼보드</option>
              <option>광고 POP</option>
            </select>

            {selectedProduct !== "광고 POP" ? (
              <>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="block font-bold">가로(cm)</label>
                    <input
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      type="number"
                      min="0"
                      className="mt-2 w-full border border-[#D8DCCB] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F5F3A]"
                      placeholder="500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold">세로(cm)</label>
                    <input
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      type="number"
                      min="0"
                      className="mt-2 w-full border border-[#D8DCCB] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F5F3A]"
                      placeholder="90"
                    />
                  </div>
                </div>

                <label className="block font-bold mt-4">수량</label>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  min="1"
                  className="mt-2 w-full border border-[#D8DCCB] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F5F3A]"
                  placeholder="1"
                />

                <div className="mt-5 rounded-2xl bg-[#EEF0E7] p-5">
                  <p className="text-sm font-bold text-[#6B7467]">
                    기본 예상 제작비
                  </p>

                  <p className="mt-1 text-3xl font-black text-[#34412F]">
                    {estimate
                      ? `${estimate.total.toLocaleString()}원 ~`
                      : "금액 확인 가능"}
                  </p>

                  {estimate && (
                    <p className="mt-1 text-sm text-[#6B7467]">
                      {estimate.area.toFixed(2)}㎡ 기준
                    </p>
                  )}
                </div>

                <p className="mt-3 text-xs text-[#6B7467] leading-relaxed">
                  ※ 기본 출력 제작비 기준이며 마감, 배송, 시공, 디자인 작업 등에 따라 최종 금액은 달라질 수 있습니다.
                </p>
              </>
            ) : (
              <div className="mt-5 rounded-2xl bg-[#EEF0E7] p-5">
                <p className="text-sm font-bold text-[#6B7467]">
                  별도 견적 안내
                </p>

                <p className="mt-2 text-xl font-black leading-snug text-[#34412F]">
                  광고 POP는 사양에 따라 견적이 달라집니다.
                </p>

                <p className="mt-2 text-sm text-[#6B7467] leading-relaxed">
                  형태, 사이즈, 수량, 소재를 남겨주시면 빠르게 확인해드립니다.
                </p>
              </div>
            )}

            <Link
              href={orderHref}
              className="mt-5 block w-full bg-[#34412F] text-white py-4 rounded-xl font-bold text-center hover:bg-[#4F5F3A] transition"
            >
              온라인 주문으로 정확한 견적 확인
            </Link>
          </div>
        </div>
      </section>

      <a
        href={KAKAO_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
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