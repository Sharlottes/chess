"use client";

import { Button, TextField } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [nickname, setNickname] = useState("");
  const [errorCaption, setErrorCaption] = useState<
    Partial<Record<"nickname" | "password" | "userName", string>>
  >({});
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const res = await axios
      .post("/api/v1/users/signup", {
        userName: id,
        password: password,
        nickname: nickname,
      })
      .then(
        () => router.push("/"),
        (e: AxiosError) => {
          if (!e.response) return;
          const res = e.response.data as Partial<
            Record<"nickname" | "password" | "userName", string>
          >;
          setErrorCaption(res);
        }
      );
    console.log(res);
  };

  return (
    <div
      style={{
        maxWidth: "460px",
        margin: "0 auto",
        marginTop: "256px",
        display: "flex",
        gap: "4px",
        flexDirection: "column",
      }}
    >
      <TextField.Root
        placeholder="닉네임"
        size="3"
        onChange={handleChangeNickname}
      />
      <p
        style={{
          color: "red",
          fontWeight: "lighter",
          fontSize: "11px",
          marginBottom: "4px",
        }}
      >
        {errorCaption?.nickname}
      </p>
      <TextField.Root placeholder="ID" size="3" onChange={handleChangeId} />
      <p
        style={{
          color: "red",
          fontWeight: "lighter",
          fontSize: "11px",
          marginBottom: "4px",
        }}
      >
        {errorCaption?.userName}
      </p>
      <TextField.Root
        placeholder="Password"
        type="password"
        size="3"
        onChange={handleChangePassword}
      />
      <p
        style={{
          color: "red",
          fontWeight: "lighter",
          fontSize: "11px",
          marginBottom: "4px",
        }}
      >
        {errorCaption?.password}
      </p>
      <Button
        color="grass"
        size="4"
        style={{ fontWeight: "bold", marginTop: "8px" }}
        onClick={handleLogin}
      >
        {" "}
        회원가입
      </Button>
    </div>
  );
}
