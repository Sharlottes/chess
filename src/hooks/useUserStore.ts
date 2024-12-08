import { client } from "@/lib/axios/client";
import { AxiosError } from "axios";
import { create } from "zustand";

type APIReponse = { success: true } | { success: false; error: any };
export interface UserStore {
  data:
    | {
        uid: number;
        userName: string;
        password: string;
        nickname: string;
        record: {
          id: number;
          user: string;
          wins: number;
          losses: number;
          draws: number;
        };
      }
    | undefined;

  login: (userName: string, password: string) => Promise<APIReponse>;
  logout: () => Promise<APIReponse>;
  setPassword: (
    uid: number,
    oldPassword: string,
    newPassword: string
  ) => Promise<APIReponse>;
  setNickname: (
    uid: number,
    password: string,
    newNickname: string
  ) => Promise<APIReponse>;
  updateUser: () => Promise<{ success: boolean; error?: any }>;
  deleteUser: (uid: number, password: string) => Promise<APIReponse>;
}

/**
 * store current logged in user
 */
const useUserStore = create<UserStore>((set) => ({
  data: undefined,
  login: async (userName: string, password: string) => {
    const res = await client
      .post("/api/v1/users/login", {
        userName,
        password,
      })
      .then(
        (res) => res,
        (err) => err
      );
    if (res.status === 200) {
      sessionStorage.setItem("userId", res.data.uid);
      set({ data: res.data });
      return { success: true };
    } else {
      return { success: false, error: res };
    }
  },
  logout: async () => {
    set({ data: undefined });
    return { success: true };
  },
  setPassword: async (
    uid: number,
    oldPassword: string,
    newPassword: string
  ) => {
    const res = await client
      .put(`/api/v1/users/${uid}/password`, {
        data: { oldPassword, newPassword },
      })
      .then(
        (res) => res,
        (err) => err
      );
    if (res.status === 200) {
      set((state) => ({ data: { ...state.data!, password: newPassword } }));
      return { success: true };
    } else {
      return { success: false, error: res };
    }
  },
  setNickname: async (uid: number, password: string, newNickname: string) => {
    const res = await client
      .put(`/api/v1/users/${uid}/nickname`, {
        data: { password, newNickname },
      })
      .then(
        (res) => res,
        (err) => err
      );
    if (res.status === 200) {
      set((state) => ({ data: { ...state.data!, nickname: newNickname } }));
      return { success: true };
    } else {
      return { success: false, error: res };
    }
  },
  updateUser: async () => {
    const uid = sessionStorage.getItem("userId");
    const res = await client.get(`/api/v1/users/${uid}`).then(
      (res) => res,
      (err) => err
    );
    if (res.status === 200) {
      set({ data: res.data });
      return { success: true };
    } else {
      return { success: false, error: res };
    }
  },
  deleteUser: async (uid: number, password: string) => {
    const res = await client
      .delete(`/api/v1/users/${uid}`, {
        data: { password },
      })
      .then(
        (res) => res,
        (err) => err
      );
    console.log(res);
    if (res.status === 200) {
      set({ data: undefined });
      return { success: true };
    } else {
      return { success: false, error: res };
    }
  },
}));
export default useUserStore;
