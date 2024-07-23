"use client";
import { useEffect } from "react";
import { useTelegram } from "@/providers/telegram";

export default function Template({ children }: { children: React.ReactNode }) {
  const { webApp } = useTelegram();

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
      <div className="background"></div>
    </>
  );
}
