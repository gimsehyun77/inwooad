import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "인우애드 | 실사출력 · 포토존 · 팝업스토어 · 건설현장 펜스",
    template: "%s | 인우애드",
  },
  description:
    "1999년부터 이어온 실사출력 전문업체 인우애드입니다. 현수막, 배너, 브랜드 포토존, 팝업스토어, 기업행사, 건설현장 펜스 제작부터 시공까지 함께합니다.",
  keywords: [
    "인우애드",
    "실사출력",
    "현수막 제작",
    "배너 제작",
    "포토존 제작",
    "팝업스토어 제작",
    "건설현장 펜스",
    "대형 출력",
    "기업행사 출력",
  ],
  openGraph: {
    title: "인우애드 | 실사출력 · 포토존 · 팝업스토어 전문",
    description:
      "현수막, 배너, 브랜드 포토존, 팝업스토어, 건설현장 펜스까지 제작부터 시공까지.",
    url: "https://inwooad.vercel.app",
    siteName: "인우애드",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Hw3vuVPoK9sCcxdTrfCrk5IY8jFIUIwtVKZDjmtz_2Y",
    other: {
      "naver-site-verification":
        "e00b74049475a44932da427a6afb46c9132ee249",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18299011325"
          strategy="afterInteractive"
        />

        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-18299011325');
          `}
        </Script>

        {children}
        <Analytics />
      </body>
    </html>
  );
}