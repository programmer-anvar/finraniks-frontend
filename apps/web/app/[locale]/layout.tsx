import type { Metadata } from "next";
import localFont from 'next/font/local'
import { ReactNode } from "react";
import { getDeviceType } from "@/utils/get-device-type";
import { headers } from "next/headers";

import LayoutWrapper from "@/components/layout/wrapper";
import GoogleTagManager from "@/components/analytics/google-tag-manager";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import MicrosoftClarity from "@/components/analytics/microsoft-clarity";

import "./globals.css";

export const dynamic = 'force-dynamic';

// ------------------------
// Fonts
// ------------------------

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Bold.woff2",
      weight: '700',
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-SemiBold.woff2",
      weight: '600',
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Medium.woff2",
      weight: '500',
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Regular.woff2",
      weight: '300',
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Light.woff2",
      weight: '200',
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-Bold.woff2",
      weight: '700',
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-SemiBold.woff2",
      weight: '600',
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-Medium.woff2",
      weight: '500',
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-Regular.woff2",
      weight: '400',
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Finranks",
  description: "Financial analytics platform",
  // Prevent indexing in test/staging environment
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};


export default async function RootLayout({ children }: RootLayoutProperties) {
  const deviceInfo = getDeviceType(await headers());
  const isMobile = deviceInfo.isMobile || deviceInfo.isTablet;

  return (
    <html lang="en" data-device={isMobile ? 'mobile' : 'desktop'}>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
        <MicrosoftClarity />
      </head>
      <body
        className={`${gilroy.variable} ${inter.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MH9FFL9G"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
