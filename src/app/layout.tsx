"use client";

import "@radix-ui/themes/styles.css";
import "@/_styles/globals.css";

import { OverlayProvider } from "overlay-kit";
import { Theme } from "@radix-ui/themes";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";

import Header from "@/components/Header";
import * as styles from "./layout.css";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={noto_sans_kr.className + " " + styles.body}>
        <Theme
          style={{
            backgroundColor: "#4b4847",
          }}
        >
          <SnackbarProvider>
            <OverlayProvider>
              <Header />
              <main>{children}</main>
            </OverlayProvider>
          </SnackbarProvider>
        </Theme>
      </body>
    </html>
  );
}
