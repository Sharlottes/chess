"use client";

import Image from "next/image";

import chessboardUrl from "@/_assets/images/chessboard.png";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

import * as styles from "./page.css";

export default function App() {
  const isLogin = true;
  const handleLogout = () => {};

  return (
    <div className={styles.container}>
      <Image src={chessboardUrl} alt="" width={320} height={320} />
      <div>
        <h1 className={styles.title}>THE CHESS</h1>
        {isLogin ? (
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
              onClick={handleLogout}
            >
              로그아웃하기
            </Button>
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Button color="grass" size="4" className={styles.button}>
                로그인
              </Button>
            </Link>
            <Link href={"/signup"}>
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
