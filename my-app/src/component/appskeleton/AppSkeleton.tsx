"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./AppSkeleton.module.scss";
import React, { useEffect } from "react";
import Loader from "../loader/Loader";
import IconWithLabel from "../iconWithLabel/IconWithLabel";
import { HomeIcon, Logout, ProfileIcon, SummaryIcon } from "@/src/assets/icons";
import { routesConstants } from "@/src/constants";
import LogoutPopup from "../logoutPopup/LogoutPopup";
import useUserStore from "@/src/zustand/useUserStore";
import { userAction } from "@/src/actions";

interface Props {
  children: React.ReactNode;
  ChildclassName?: string;
}

const AppSkeleton: React.FC<Props> = ({ children, ChildclassName }) => {
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLogout, setIsLogout] = React.useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = React.useState(false);

  const onConfirm = () => {
    setIsLogout(true);
    clearUser();
    localStorage.removeItem("token");
    setIsLogoutPopupOpen(false);
    router.push(routesConstants.ROUTES.LOGIN);
  };

  if (isLoading) {
    return <Loader isLoading />;
  }

  return (
    <main className={styles.AppSkeleton}>
      <nav
        className={`${styles.sideDrawer} w-[254px] h-screen bg-[#121212] pt-12 pb-8 flex flex-col justify-between `}
      >
        <div className="flex flex-col gap-3">
          <IconWithLabel
            label="Home"
            isActive={pathname === routesConstants.ROUTES.HOME}
            icon={<HomeIcon />}
            onClick={() => router.push(routesConstants.ROUTES.HOME)}
          />
          <IconWithLabel
            label="Summary"
            icon={<SummaryIcon />}
            isActive={pathname === routesConstants.ROUTES.SUMMARY}
            onClick={() => router.push(routesConstants.ROUTES.SUMMARY)}
          />
          <IconWithLabel
            label="Profile"
            icon={<ProfileIcon />}
            isActive={pathname === routesConstants.ROUTES.PROFILE}
            onClick={() => router.push(routesConstants.ROUTES.PROFILE)}
          />
        </div>
        <div>
          <IconWithLabel
            label="Logout"
            icon={<Logout />}
            onClick={() => setIsLogoutPopupOpen(true)}
            isActive={false}
          />
        </div>
      </nav>
      <LogoutPopup
        isLoading={isLogout}
        isOpen={isLogoutPopupOpen}
        onConfirm={onConfirm}
        onCancel={() => setIsLogoutPopupOpen(false)}
      />

      <div className={`${styles.child} ${ChildclassName}`}>{children}</div>
    </main>
  );
};

export default AppSkeleton;
