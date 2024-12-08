"use client";

import { Button, IconButton } from "@radix-ui/themes";
import Link from "next/link";

import useUserStore from "@/hooks/useUserStore";
import { usePathname, useRouter } from "next/navigation";

import ConfigIcon from "@/_assets/icons/ConfigIcon";
import * as styles from "./index.css";
import { useShallow } from "zustand/react/shallow";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, logout] = useUserStore(
    useShallow((state) => [state.data, state.logout])
  );
  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      router.refresh();
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>
        THE CHESS
      </Link>
      {userData ? (
        <>
          <Link href="/game">
            <Button className={styles.button} color="blue">
              시작하기
            </Button>
          </Link>
          <Button className={styles.button} color="cyan" onClick={handleLogout}>
            로그아웃
          </Button>
          <Link href="/user">
            <IconButton variant="ghost" style={{ cursor: "pointer" }}>
              <ConfigIcon />
            </IconButton>
          </Link>
        </>
      ) : (
        <>
          <Link href={`/login?redirect=${pathname}`}>
            <Button color="grass" className={styles.button}>
              로그인
            </Button>
          </Link>
          <Link href={`/signup?redirect=${pathname}`}>
            <Button color="green" className={styles.button}>
              회원가입
            </Button>
          </Link>
        </>
      )}
    </header>
  );
}
