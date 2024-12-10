"use client";

import useUserStore, { UserStore } from "@/hooks/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export type GuardType = "nouser" | "user" | "public";
export default function withAuth(
  WrappedComponent: React.FC,
  guard: GuardType = "public",
  redirect = null
) {
  // pass public page
  if (guard === "public") {
    return WrappedComponent;
  }

  const RouteGuard = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const [userData, updateUser] = useUserStore(
      useShallow((state) => [state.data, state.updateUser])
    );
    const [isUpdating, setIsUpdating] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      updateUser().then(() => setIsUpdating(false));
      if (userData) {
        setIsUpdating(false);
        return;
      }
      setIsUpdating(true);
    }, [userData, updateUser]);

    const checkVerification = (
      guard: GuardType,
      userData: UserStore["data"] | undefined
    ) => {
      switch (guard) {
        case "nouser":
          return !userData;
        case "user":
          return userData;
      }
    };

    if (isUpdating) return <div>loading...</div>;

    if (checkVerification(guard, userData)) {
      return <WrappedComponent {...props} />;
    } else {
      enqueueSnackbar("로그인이 필요한 페이지입니다.", { variant: "error" });
      router.push(redirect ?? `/login?redirect=${pathname}`);
    }
  };

  RouteGuard.displayName = "routeGuard";
  return RouteGuard;
}
