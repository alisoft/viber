import "./globals.css";
import React from "react";
import cx from "classnames";
import { dir } from "i18next";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { BiArrowToTop } from "react-icons/bi";
import NextTopLoader from "nextjs-toploader";
import GoogleAnalytics from "@/components/shared/google-analytics";
// import CookieBanner from "@/components/shared/cookie-banner";
import ScrollToTop from "@/components/layout/scroll-to-top";
import { languages } from "@/i18n/settings";
import { basePath } from "@/constants";
import Footer from "@/components/layout/footer";
import { sfPro, inter } from "./fonts";
import Particles from "./particles";
import { Providers } from "./providers";

// 是否显示背景特效
const NEXT_PUBLIC_SHOW_PARTICLES = process.env.NEXT_PUBLIC_SHOW_PARTICLES;

const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata | undefined> {
  return {
    title: params.lng === "en" ? "Viber" : "Viber",
    description: `${params.lng === "en" ? "Viber" : "Viber"}.`,
    metadataBase: new URL("https://kjxbyz.com"),
    icons: {
      icon: `${basePath}/logo.jpg`,
    },
  };
}

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={params.lng} dir={dir(params.lng)} suppressHydrationWarning>
      <body
        className={cx(
          sfPro.variable,
          inter.variable,
          "flex min-h-screen flex-col",
        )}
      >
        <NextTopLoader height={1} />
        <Providers>
          {NEXT_PUBLIC_SHOW_PARTICLES && <Particles />}
          <Header lng={params.lng} />
          <main
            id="main"
            className="flex w-full flex-1 flex-col items-center justify-center py-32"
          >
            {children}
            <GoogleAnalytics />
          </main>
          <Footer lng={params.lng} />
          {/*<CookieBanner lng={params.lng} />*/}
        </Providers>
        <ScrollToTop
          smooth
          component={
            <BiArrowToTop className="mx-auto my-0 h-5 w-5 text-gray-700" />
          }
        />
      </body>
    </html>
  );
}
