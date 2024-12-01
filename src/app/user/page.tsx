"use client";

import Dialog from "@/components/Dialog";
import { Button, TextField } from "@radix-ui/themes";
import { overlay } from "overlay-kit";
import { useState } from "react";

export default function UserPage() {
  const handleChangePassword = () => {};
  const handleChangeNickname = () => {};
  const handleDeleteUser = () => {};

  const [passwordToSignout, setPasswordToSignout] = useState("");

  return (
    <div
      style={{
        margin: "64px auto",
        maxWidth: "620px",
      }}
    >
      <Button
        color="red"
        style={{ width: "100%", fontWeight: "bold", cursor: "pointer" }}
        size="4"
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog open={isOpen} onClose={close}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "16px",
                  width: "360px",
                  height: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                  gap: "12px",
                }}
              >
                <p>비밀번호 입력이 필요합니다.</p>
                <TextField.Root
                  placeholder="Password"
                  type="password"
                  size="3"
                  onChange={(e) => setPasswordToSignout(e.target.value)}
                />
                <div
                  style={{
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Button color="red" onClick={handleDeleteUser}>
                    탈퇴하기
                  </Button>
                  <Button color="gray" onClick={close}>
                    취소하기
                  </Button>
                </div>
              </div>
            </Dialog>
          ));
        }}
      >
        회원탈퇴
      </Button>
    </div>
  );
}
