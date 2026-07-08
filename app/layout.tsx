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

const SITE_URL = "https://inwooad.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "인우애드 | 실사출력·포토존·팝업스토어·대형 펜스 제작",
    template: "%s | 인우애드",
  },

  applicationName: "인우애드",

  description:
    "1999년부터 이어온 실사출력 전문업체 인우애드입니다. 현수막, 배너, 브랜드 포토존, 팝업스토어, 기업행사, 건설현장 대형 펜스까지 제작부터 현장 시공까지 진행합니다.",

  keywords: [
    "인우애드",
    "실사출력",
    "대형 실사출력",
    "현수막 제작",
    "배너 제작",
    "포토존 제작",
    "브랜드 포토존",
    "팝업스토어 제작",
    "팝업스토어 시공",
    "건설현장 펜스",
    "대형 펜스 출력",
    "기업행사 제작",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "인우애드 | 실사출력·포토존·팝업스토어·대형 펜스",
    description:
      "26년 이상의 제작 경험. 브랜드 포토존, 팝업스토어, 대형 실사출력, 건설현장 펜스까지 제작부터 시공까지 진행합니다.",
    url: SITE_URL,
    siteName: "인우애드",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "인우애드 로고",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "인우애드 | 실사출력·포토존·팝업스토어·대형 펜스",
    description:
      "브랜드 포토존, 팝업스토어, 대형 실사출력, 건설현장 펜스 제작 및 시공 전문.",
    images: ["/android-chrome-512x512.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "인우애드",
    alternateName: ["INWOOAD", "인우애드 실사출력"],
    url: SITE_URL,
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "인우애드",
    alternateName: "INWOOAD",
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    image: `${SITE_URL}/android-chrome-512x512.png`,
    description:
      "실사출력, 브랜드 포토존, 팝업스토어, 기업행사 및 건설현장 대형 펜스 제작·시공 전문업체",
    foundingDate: "1999",
  };

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="website-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteStructuredData)}
        </Script>

        <Script
          id="organization-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(organizationStructuredData)}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18299011325"
          strategy="afterInteractive"
        />

        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            window.gtag = gtag;

            gtag("js", new Date());
            gtag("config", "AW-18299011325");
          `}
        </Script>

        {children}

        <Analytics />
      </body>
    </html>
  );
}