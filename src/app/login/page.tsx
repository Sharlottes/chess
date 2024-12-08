"use client";

import useUserStore from "@/hooks/useUserStore";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";

import * as styles from "./page.css";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const login = useUserStore((state) => state.login);

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const res = await login(id, password);

    if (res.success) {
      enqueueSnackbar("로그인에 성공했습니다.", { variant: "success" });
      router.push(redirectUrl ?? "/");
    } else {
      enqueueSnackbar(
        res.error.status === "401"
          ? "비밀번호가 틀렸습니다."
          : res.error.status === "404"
          ? "존재하지 않는 아이디입니다."
          : "로그인에 실패했습니다.",
        { variant: "error" }
      );
      console.log(res.error);
    }
  };

  return (
    <div className={styles.container}>
      <TextField.Root placeholder="ID" size="3" onChange={handleChangeId} />
      <TextField.Root
        placeholder="Password"
        type="password"
        size="3"
        onChange={handleChangePassword}
      />
      <Button
        color="grass"
        size="4"
        className={styles.button}
        onClick={handleLogin}
      >
        로그인
      </Button>
      <Link href={"/signup"}>
        <Button color="green" size="4" className={styles.button}>
          회원가입
        </Button>
      </Link>
    </div>
  );
}
