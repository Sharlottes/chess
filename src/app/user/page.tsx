"use client";

import Dialog from "@/components/Dialog";
import { Button, TextField } from "@radix-ui/themes";
import { overlay } from "overlay-kit";
import { useRef } from "react";
import useUserStore from "@/hooks/useUserStore";
import { useShallow } from "zustand/react/shallow";
import { useSnackbar } from "notistack";
import withAuth from "@/components/hoc/withAuth";

import * as styles from "./page.css";

function UserPage() {
  const changePasswordPWRef = useRef<HTMLInputElement>(null);
  const changePasswordValueRef = useRef<HTMLInputElement>(null);
  const changeNicknamePWRef = useRef<HTMLInputElement>(null);
  const changeNicknameValueRef = useRef<HTMLInputElement>(null);
  const deleteUserRef = useRef<HTMLInputElement>(null);

  const [userData, setPassword, setNickname, deleteUser, updateUser] =
    useUserStore(
      useShallow((state) => [
        state.data,
        state.setPassword,
        state.setNickname,
        state.deleteUser,
        state.updateUser,
      ])
    );
  const { enqueueSnackbar } = useSnackbar();

  const handleChangePassword = async () => {
    if (!(changePasswordPWRef.current && changePasswordValueRef.current))
      return;
    const res = await setPassword(
      userData!.uid,
      changePasswordPWRef.current.value,
      changePasswordValueRef.current.value
    );
    if (res.success) {
      enqueueSnackbar("비밀번호가 변경되었습니다.", { variant: "success" });
      return true;
    } else {
      enqueueSnackbar(
        res.error.status === "401"
          ? "이 계정에 로그인되어 있지 않습니다."
          : res.error.status === "403"
          ? "비밀번호가 일치하지 않습니다."
          : res.error.status === "404"
          ? "계정을 찾을 수 없습니다."
          : "비밀번호 변경을 실패했습니다.",
        { variant: "error" }
      );
      return false;
    }
  };
  const handleChangeNickname = async () => {
    if (!(changeNicknamePWRef.current && changeNicknameValueRef.current))
      return;

    const res = await setNickname(
      userData!.uid,
      changeNicknamePWRef.current.value,
      changeNicknameValueRef.current.value
    );
    if (res.success) {
      enqueueSnackbar("닉네임이 변경되었습니다.", { variant: "success" });
      return true;
    } else {
      enqueueSnackbar(
        res.error.status === "401"
          ? "이 계정에 로그인되어 있지 않습니다."
          : res.error.status === "403"
          ? "비밀번호가 일치하지 않습니다."
          : res.error.status === "404"
          ? "계정을 찾을 수 없습니다."
          : "닉네임 변경을 실패했습니다.",
        { variant: "error" }
      );
      return false;
    }
  };
  const handleDeleteUser = async () => {
    if (!deleteUserRef.current) return;

    console.log(userData, ",", deleteUserRef.current.value);
    if (!userData || !userData.record) return;
    const res = await deleteUser(userData.uid, deleteUserRef.current.value);
    if (res.success) {
      enqueueSnackbar("계정이 성공적으로 삭제되었습니다.", {
        variant: "success",
      });
      return true;
    } else {
      enqueueSnackbar(
        res.error.status === "401"
          ? "이 계정에 로그인되어 있지 않습니다."
          : res.error.status === "403"
          ? "비밀번호가 일치하지 않습니다."
          : res.error.status === "404"
          ? "계정을 찾을 수 없습니다."
          : "회원탈퇴를 실패했습니다.",
        { variant: "error" }
      );
      return false;
    }
  };

  if (!userData) return;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{userData.nickname}</h1>
        <div className={styles.divider} />
        <p>{`${userData.record.wins}승  ${userData.record.losses}패  ${userData.record.draws}무`}</p>
      </div>
      <Button
        color="blue"
        className={styles.button}
        size="4"
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog open={isOpen} onClose={close}>
              <div className={styles.dialog}>
                <p>비밀번호 입력이 필요합니다.</p>
                <TextField.Root
                  ref={changeNicknamePWRef}
                  placeholder="Password"
                  type="password"
                  size="3"
                />
                <TextField.Root
                  ref={changeNicknameValueRef}
                  placeholder="New Nickname"
                  size="3"
                />
                <div className={styles.actionBar}>
                  <Button color="blue" onClick={handleChangeNickname}>
                    닉네임 변경
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
        닉네임 변경
      </Button>
      <Button
        color="orange"
        className={styles.button}
        size="4"
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog open={isOpen} onClose={close}>
              <div className={styles.dialog}>
                <p>비밀번호 입력이 필요합니다.</p>
                <TextField.Root
                  ref={changePasswordPWRef}
                  placeholder="Old Password"
                  type="password"
                  size="3"
                />
                <TextField.Root
                  ref={changePasswordValueRef}
                  placeholder="New Password"
                  type="password"
                  size="3"
                />
                <div className={styles.actionBar}>
                  <Button color="orange" onClick={handleChangePassword}>
                    비밀번호 변경
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
        비밀번호 변경
      </Button>
      <Button
        color="red"
        className={styles.button}
        size="4"
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Dialog open={isOpen} onClose={close}>
              <div className={styles.dialog}>
                <p>비밀번호 입력이 필요합니다.</p>
                <TextField.Root
                  ref={deleteUserRef}
                  placeholder="Password"
                  type="password"
                  size="3"
                />
                <div className={styles.actionBar}>
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
export default withAuth(UserPage, "user");
