"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
const KAKAO_CHAT_URL = "https://pf.kakao.com/_FhxkPX";
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type GalleryItem = {
  title: string;
  desc: string;
  image: string;
};

type Category = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  blogUrl?: string;
  gallery?: GalleryItem[];
};

function AnimatedStat({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(end * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return (
    <div className="overflow-hidden">
      <p className="text-5xl md:text-7xl font-black text-[#62764B] tracking-tight animate-stat-up">
        {count.toLocaleString()}
        {suffix}
      </p>

      <p className="mt-3 text-[#6F7568] font-bold text-lg">{label}</p>
    </div>
  );
}

export default function PortfolioPage() {
  const trackKakaoClick = () => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "conversion", {
      send_to: "AW-18299011325/Nv3RCN-xhMwcEP2B05VE",
      value: 1.0,
      currency: "KRW",
    });
};

  const stats = [
    {
      end: 10000,
      suffix: "㎡+",
      label: "최대 시공 규모",
    },
    {
      end: 26,
      suffix: "년+",
      label: "제작 경력",
    },
    {
      end: 2000,
      suffix: "건+",
      label: "전국 납품 횟수",
    },
  ];

  const categories: Category[] = [
    {
      id: "popup",
      label: "01",
      title: "팝업 · 전시 공간",
      subtitle: "브랜드가 돋보이는 공간 연출",
      desc: "팝업스토어, 전시 공간, 포토존, 캐릭터 등신대, 브랜드 월, 제품 진열 공간까지 현장 분위기에 맞는 출력물을 제작합니다.",
      image: "/portfolio/popup.jpeg",
      blogUrl: "https://blog.naver.com/inwooad88/224335819326",
      gallery: [
        {
          title: "캐릭터 등신대 제작",
          desc: "브랜드 캐릭터와 제품 이미지를 형태에 맞게 커팅해 행사장과 매장에 어울리는 등신대로 제작합니다.",
          image: "/portfolio/popup-character.png",
        },
        {
          title: "계단 · 벤치 랩핑",
          desc: "복잡한 계단, 벤치, 벽면 구조에도 맞춤 랩핑을 적용해 공간 전체를 브랜드 경험으로 연출합니다.",
          image: "/portfolio/popup-wrapping.png",
        },
        {
          title: "포토존 제작",
          desc: "방문객이 사진을 남기고 공유할 수 있는 포토존, 백월, 브랜드 월을 제작합니다.",
          image: "/portfolio/popup-photozone.png",
        },
      ],
    },
    {
      id: "event",
      label: "02",
      title: "기업 · 학교 · 기관 행사",
      subtitle: "특수 인쇄부터 대형 이벤트 배너까지",
      desc: "기업 행사, 학교 축제, 기관 행사, 전시회, 박람회 현장에 필요한 대형 배너, 현수막, 안내 사인물은 물론 투명 인쇄, 바닥 인쇄, 조명용 와이드칼라 인쇄 등 특수 출력물까지 제작합니다.",
      image: "/portfolio/event.jpg",
      blogUrl: "https://blog.naver.com/inwooad88/224336113727",
      gallery: [
        {
          title: "투명 인쇄",
          desc: "유리면, 아크릴, 투명 소재에 어울리는 인쇄물로 공간을 깔끔하고 고급스럽게 연출합니다.",
          image: "/portfolio/event-transparent.png",
        },
        {
          title: "바닥 인쇄",
          desc: "행사장 동선 안내, 브랜드 그래픽, 포토존 연출에 활용 가능한 바닥용 출력물을 제작합니다.",
          image: "/portfolio/event-floor.png",
        },
        {
          title: "조명용 와이드칼라 인쇄",
          desc: "백라이트, 조명 박스, 행사장 사인물에 적합한 선명한 조명용 출력물을 제작합니다.",
          image: "/portfolio/event-lightbox.png",
        },
      ],
    },
    {
      id: "fence",
      label: "03",
      title: "건설현장 펜스",
      subtitle: "Before → After로 바뀌는 현장 이미지",
      desc: "공사장 가림막, 펜스 광고, 현장 안내 사인물을 제작해 건설현장의 외관을 깔끔하고 신뢰감 있게 연출합니다.",
      image: "/portfolio/fence.jpg",
      blogUrl: "https://blog.naver.com/inwooad88/224336154283",
      gallery: [
        {
          title: "Before",
          desc: "시공 전 현장 상태",
          image: "/portfolio/fence-before.jpeg",
        },
        {
          title: "After",
          desc: "대형 펜스 시공 완료",
          image: "/portfolio/fence-after.jpeg",
        },
      ],
    },
    {
      id: "production",
      label: "04",
      title: "제작부터 시공까지",
      subtitle: "출력, 제작, 설치까지 한 번에",
      desc: "자체 장비를 통한 직접 제작과 현장 설치까지 책임지고 진행합니다. 고용보험·산재보험 가입 등 안전한 시공 체계를 갖추고 있어 기업, 기관, 대형 현장 작업도 안정적으로 진행할 수 있습니다.",
      image: "/portfolio/production.jpg",
      gallery: [
        {
          title: "제작 현장",
          desc: "자체 장비를 통한 직접 제작",
          image: "/portfolio/production-machine.png",
        },
        {
          title: "시공 현장",
          desc: "현장 조건에 맞춘 안전한 설치",
          image: "/portfolio/production-install.jpeg",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAFAF7] via-[#F7F8F3] to-[#EEF2EA] text-[#1F261B]">
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
            <Link href="/portfolio" className="text-[#62764B] font-bold">
              제작사례
            </Link>
            <Link href="/quote" className="hover:text-[#62764B] transition">
              견적문의
            </Link>
            <Link href="/order" className="hover:text-[#62764B] transition">
              온라인주문
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden py-24 border-b border-[#62764B]/15">
        <div className="absolute -top-40 right-[-120px] h-[700px] w-[700px] rounded-full bg-[#62764B]/20 blur-[150px]" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[500px] w-[500px] rounded-full bg-[#C8D2BE]/50 blur-[140px]" />
        <div className="absolute left-1/2 top-10 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-white/70 blur-[180px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <p className="text-[#62764B] font-bold mb-4">PORTFOLIO</p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight text-[#1F261B]">
            제작 사례
            <br />
            현장별 출력 솔루션
          </h1>

          <p className="mt-6 text-xl text-[#687160] max-w-3xl leading-relaxed">
            팝업스토어, 전시 공간, 기업 행사, 학교 행사, 건설현장 펜스,
            대형 출력물 시공까지 인우애드는 현장 목적에 맞는 제작물을 직접
            제작하고 설치합니다.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-14">
            {stats.map((stat) => (
              <AnimatedStat
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-5 mt-8">
            {categories.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group relative overflow-hidden rounded-3xl border border-[#62764B]/15 bg-white/70 p-6 min-h-[210px] shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#62764B]/60 hover:bg-white"
              >
                <div className="absolute top-0 left-0 h-1 w-0 bg-[#62764B] transition-all duration-300 group-hover:w-full" />

                <p className="text-5xl font-black text-[#62764B]/10 transition group-hover:text-[#62764B]/20">
                  {item.label}
                </p>

                <div className="absolute left-6 right-6 bottom-6">
                  <h3 className="text-2xl font-black leading-tight break-keep text-[#26331E]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm text-[#727A6B] leading-relaxed break-keep">
                    {item.subtitle}
                  </p>

                  <p className="mt-5 text-[#62764B] font-bold text-sm">
                    자세히 보기 →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {categories.map((item, index) => (
        <section
          key={item.id}
          id={item.id}
          className="scroll-mt-28 py-24 border-b border-[#62764B]/15"
        >
          {item.id === "event" ? (
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-[#62764B] font-bold mb-4">{item.subtitle}</p>

              <h2 className="text-5xl md:text-6xl font-black leading-tight break-keep text-[#1F261B]">
                {item.title}
              </h2>

              <p className="mt-6 text-lg text-[#687160] leading-relaxed max-w-4xl break-keep">
                {item.desc}
              </p>

              {item.gallery && (
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  {item.gallery.map((photo) => (
                    <div
                      key={photo.title}
                      className="group overflow-hidden rounded-3xl border border-[#62764B]/15 bg-white/75 shadow-sm"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F261B]/30 via-transparent to-transparent" />
                      </div>

                      <div className="p-7">
                        <h3 className="text-2xl font-black break-keep text-[#26331E]">
                          {photo.title}
                        </h3>

                        <p className="mt-4 text-[#687160] leading-relaxed break-keep">
                          {photo.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="bg-[#62764B] text-white px-8 py-4 rounded-xl font-bold shadow-sm hover:bg-[#52663E] transition"
                >
                  견적 문의하기
                </Link>

                {item.blogUrl && (
                  <a
                    href={item.blogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#62764B]/35 text-[#62764B] px-8 py-4 rounded-xl font-bold hover:border-[#62764B] hover:bg-[#62764B]/10 transition"
                  >
                    관련 블로그 글 보기
                  </a>
                )}
              </div>
            </div>
          ) : item.id === "fence" ? (
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-[#62764B] font-bold mb-4">{item.subtitle}</p>

              <h2 className="text-5xl md:text-6xl font-black leading-tight break-keep text-[#1F261B]">
                {item.title}
              </h2>

              <p className="mt-6 text-lg text-[#687160] leading-relaxed max-w-4xl break-keep">
                {item.desc}
              </p>

              <div className="mt-8 rounded-3xl border border-[#62764B]/30 bg-white/70 p-7 md:p-9 shadow-sm">
                <p className="text-[#62764B] font-black text-lg">
                  대형 건설현장 펜스 시공 가능
                </p>

                <h3 className="mt-3 text-3xl md:text-5xl font-black leading-tight break-keep text-[#26331E]">
                  10,000㎡ 이상 규모도
                  <br />
                  제작부터 현장 시공까지 가능합니다.
                </h3>

                <p className="mt-5 text-[#687160] leading-relaxed break-keep">
                  현장 사진이나 대략적인 사이즈만 보내주셔도 출력 방식,
                  시공 범위, 견적을 빠르게 안내드립니다.
                </p>
              </div>

              {item.gallery && (
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  {item.gallery.map((photo) => (
                    <div
                      key={photo.title}
                      className="group overflow-hidden rounded-3xl border border-[#62764B]/15 bg-white/75 shadow-sm"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F261B]/65 via-[#1F261B]/10 to-transparent" />

                        <div className="absolute left-7 bottom-7">
                          <p className="text-[#DDE8D3] font-black text-sm">
                            {photo.desc}
                          </p>
                          <h3 className="mt-2 text-4xl md:text-5xl font-black text-white">
                            {photo.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="bg-[#62764B] text-white px-8 py-4 rounded-xl font-bold shadow-sm hover:bg-[#52663E] transition"
                >
                  견적 문의하기
                </Link>

                {item.blogUrl && (
                  <a
                    href={item.blogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#62764B]/35 text-[#62764B] px-8 py-4 rounded-xl font-bold hover:border-[#62764B] hover:bg-[#62764B]/10 transition"
                  >
                    관련 블로그 글 보기
                  </a>
                )}
              </div>
            </div>
          ) : item.id === "production" ? (
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-[#62764B] font-bold mb-4">{item.subtitle}</p>

              <h2 className="text-5xl md:text-6xl font-black leading-tight break-keep text-[#1F261B]">
                {item.title}
              </h2>

              <p className="mt-6 text-lg text-[#687160] leading-relaxed max-w-4xl break-keep">
                {item.desc}
              </p>

              {item.gallery && (
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  {item.gallery.map((photo) => (
                    <div
                      key={photo.title}
                      className="group overflow-hidden rounded-3xl border border-[#62764B]/15 bg-white/75 shadow-sm"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F261B]/65 via-[#1F261B]/10 to-transparent" />

                        <div className="absolute left-7 bottom-7">
                          <p className="text-[#DDE8D3] font-black text-sm">
                            {photo.desc}
                          </p>
                          <h3 className="mt-2 text-3xl md:text-4xl font-black text-white">
                            {photo.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div
              className={`max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-stretch ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#62764B]/15 h-full min-h-[720px] shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-105"
                />

                <div className="absolute inset-0 bg-[#1F261B]/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F261B]/55 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[#DDE8D3] font-black">{item.label}</p>
                  <h2 className="mt-2 text-4xl md:text-5xl font-black break-keep text-white">
                    {item.title}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[#62764B] font-bold mb-4">
                  {item.subtitle}
                </p>

                <h2 className="text-4xl md:text-5xl font-black leading-tight break-keep text-[#1F261B]">
                  {item.title}
                </h2>

                <p className="mt-6 text-lg text-[#687160] leading-relaxed break-keep">
                  {item.desc}
                </p>

                {item.gallery && (
                  <div className="grid md:grid-cols-3 gap-4 mt-8">
                    {item.gallery.map((photo) => (
                      <div
                        key={photo.title}
                        className="group overflow-hidden rounded-2xl border border-[#62764B]/15 bg-white/75 shadow-sm"
                      >
                        <div className="relative h-[220px] overflow-hidden">
                          <img
                            src={photo.image}
                            alt={photo.title}
                            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1F261B]/45 to-transparent" />
                        </div>

                        <div className="p-5">
                          <h3 className="text-xl font-black break-keep text-[#26331E]">
                            {photo.title}
                          </h3>

                          <p className="mt-3 text-sm text-[#687160] leading-relaxed break-keep">
                            {photo.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/quote"
                    className="bg-[#62764B] text-white px-7 py-4 rounded-xl font-bold shadow-sm hover:bg-[#52663E] transition"
                  >
                    견적 문의하기
                  </Link>

                  {item.blogUrl && (
                    <a
                      href={item.blogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#62764B]/35 text-[#62764B] px-7 py-4 rounded-xl font-bold hover:border-[#62764B] hover:bg-[#62764B]/10 transition"
                    >
                      관련 블로그 글 보기
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      ))}

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden bg-[#62764B] text-white rounded-3xl p-10 md:p-14 shadow-sm">
            <div className="absolute -top-32 right-[-80px] h-[360px] w-[360px] rounded-full bg-white/20 blur-[100px]" />
            <div className="absolute bottom-[-140px] left-[-80px] h-[300px] w-[300px] rounded-full bg-[#C8D2BE]/30 blur-[100px]" />

            <div className="relative">
              <p className="font-bold text-[#EAF1E3]">
                INWOOAD TOTAL PRINTING SERVICE
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">
                현장 사진이나 도면만 있어도
                <br />
                제작 가능 여부를 안내드립니다
              </h2>

              <p className="mt-5 text-lg max-w-3xl text-[#EEF2EA]">
                팝업, 전시, 행사, 건설현장 펜스, 대형 출력물 시공까지 필요한
                내용을 남겨주시면 제작 방식과 견적을 빠르게 안내드립니다.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="bg-white text-[#26331E] px-8 py-4 rounded-xl font-bold hover:bg-[#EEF2EA] transition"
                >
                  온라인 견적 문의하기
                </Link>

                <a
                  href="tel:01063137345"
                  className="border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition"
                >
                  전화문의 010-6313-7345
                </a>
              </div>
            </div>
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