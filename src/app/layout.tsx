"use client";

import "@radix-ui/themes/styles.css";
import "@/_styles/globals.css";

import { OverlayProvider } from "overlay-kit";
import { Button, IconButton, Theme } from "@radix-ui/themes";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import axios from "axios";
import Link from "next/link";

import * as styles from "./layout.css";

axios.defaults.baseURL = "http://localhost:8080";
const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isLogin = true;
  const handleLogout = () => {};

  return (
    <html lang="ko">
      <body className={noto_sans_kr.className + " " + styles.body}>
        <Theme
          style={{
            backgroundColor: "#4b4847",
          }}
        >
          <OverlayProvider>
            <header className={styles.header}>
              <Link href="/" className={styles.title}>
                THE CHESS
              </Link>
              {isLogin ? (
                <>
                  <Link href="/game">
                    <Button className={styles.button} color="blue">
                      시작하기
                    </Button>
                  </Link>
                  <Button
                    className={styles.button}
                    onClick={handleLogout}
                    color="cyan"
                  >
                    로그아웃
                  </Button>
                  <Link href="/user">
                    <IconButton variant="ghost" style={{ cursor: "pointer" }}>
                      <svg
                        fill="none"
                        height="24"
                        viewBox="0 0 16 16"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m2.26726 6.15309c.26172-.80594.69285-1.54574 1.26172-2.1727.09619-.10602.24711-.14381.38223-.0957l1.35948.484c.36857.13115.77413-.06004.90584-.42703.01295-.03609.02293-.07316.02982-.1108l.259-1.41553c.02575-.14074.13431-.25207.27484-.28186.41118-.08714.83276-.13146 1.25987-.13146.42685 0 .84818.04427 1.25912.1313.14049.02976.24904.14102.27485.28171l.25973 1.41578c.07022.38339.43924.63751.82434.5676.0379-.00688.0751-.01681.1113-.02969l1.3595-.48402c.1351-.04811.286-.01032.3822.0957.5689.62696 1 1.36676 1.2618 2.1727.0441.13596.0015.28502-.1079.3775l-1.1019.93152c-.2983.25225-.3348.69756-.0815.99463.0249.02921.0522.05635.0815.08114l1.1019.93153c.1094.09248.152.24154.1079.37751-.2618.80598-.6929 1.54578-1.2618 2.17268-.0962.106-.2471.1438-.3822.0957l-1.3595-.484c-.3685-.1311-.7741.0601-.90581.427-.01295.0361-.02293.0732-.02985.111l-.25971 1.4157c-.02581.1407-.13436.2519-.27485.2817-.41094.087-.83227.1313-1.25912.1313-.42711 0-.84869-.0443-1.25987-.1315-.14053-.0298-.24909-.1411-.27484-.2818l-.25899-1.4155c-.07022-.3834-.43928-.6375-.82433-.5676-.03787.0069-.0751.0168-.11128.0297l-1.35954.484c-.13512.0481-.28604.0103-.38223-.0957-.56887-.6269-1-1.3667-1.26172-2.17268-.04415-.13597-.00158-.28503.10783-.37751l1.1019-.93152c.29835-.25225.33484-.69756.08151-.99463-.02491-.02921-.05217-.05635-.0815-.08114l-1.10191-.93153c-.10941-.09248-.15198-.24154-.10783-.3775zm3.98268 1.84685c0 .9665.7835 1.75 1.75 1.75s1.75-.7835 1.75-1.75-.7835-1.75-1.75-1.75-1.75.7835-1.75 1.75z"
                          fill="#ffffff"
                        />
                      </svg>
                    </IconButton>
                  </Link>
                </>
              ) : (
                <>
                  <Button color="grass" className={styles.button}>
                    로그인
                  </Button>
                  <Button color="green" className={styles.button}>
                    회원가입
                  </Button>
                </>
              )}
            </header>
            <main>{children}</main>
          </OverlayProvider>
        </Theme>
      </body>
    </html>
  );
}
