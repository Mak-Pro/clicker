"use client";
import { useEffect, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { useTelegram } from "@/providers/telegram";
import AppContext from "@/providers/context";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { webApp } = useTelegram();
  const { isLogined } = useContext(AppContext);

  useEffect(() => {
    webApp?.ready();
    webApp?.expand();
    if (webApp) {
      document.body.classList.add(webApp?.colorScheme);
    }
    webApp?.onEvent("themeChanged", () => {
      if (webApp?.colorScheme === "dark") {
        document.body.classList.remove("light");
        document.body.classList.add(webApp?.colorScheme);
      }
      if (webApp?.colorScheme === "light") {
        document.body.classList.remove("dark");
        document.body.classList.add(webApp?.colorScheme);
      }
    });
  }, [webApp]);

  return (
    <>
      <main>{children}</main>
    </>
  );
}
