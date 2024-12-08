"use client";

import Image from "next/image";

import chessboardUrl from "@/_assets/images/chessboard.png";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

import { usePathname } from "next/navigation";
import useUserStore from "@/hooks/useUserStore";
import * as styles from "./page.css";
import { useShallow } from "zustand/react/shallow";

export default function App() {
  const pathname = usePathname();
  const [userData, logout] = useUserStore(
    useShallow((state) => [state.data, state.logout])
  );

  return (
    <div className={styles.container}>
      <Image src={chessboardUrl} alt="" width={320} height={320} />
      <div>
        <h1 className={styles.title}>THE CHESS</h1>
        {userData ? (
          <>
            <Link href={"/game"}>
              <Button color="blue" size="4" className={styles.button}>
                시작하기
              </Button>
            </Link>
            <Button
              color="cyan"
              size="4"
              className={styles.button}
              onClick={() => logout()}
            >
              로그아웃하기
            </Button>
          </>
        ) : (
          <>
            <Link href={`/login?redirect=${pathname}`}>
              <Button color="grass" size="4" className={styles.button}>
                로그인
              </Button>
            </Link>
            <Link href={`/signup?redirect=${pathname}`}>
              <Button color="green" size="4" className={styles.button}>
                회원가입
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
