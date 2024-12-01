"use client";

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
axios.defaults.baseURL = "http://localhost:8080";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const res = await axios.post("/api/v1/users/login", {
      userName: id,
      password: password,
    });
    console.log(res.data);
  };

  return (
    <div
      style={{
        maxWidth: "460px",
        margin: "0 auto",
        marginTop: "256px",
        display: "flex",
        gap: "8px",
        flexDirection: "column",
      }}
    >
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
        style={{ fontWeight: "bold", marginTop: "8px" }}
        onClick={handleLogin}
      >
        로그인
      </Button>
      <Link href={"/signup"}>
        <Button
          color="green"
          size="4"
          style={{
            fontWeight: "bold",
            marginTop: "8px",
            width: "100%",
          }}
        >
          회원가입
        </Button>
      </Link>
    </div>
  );
}
