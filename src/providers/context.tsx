"use client";
import React, { createContext, useState, useEffect } from "react";
import { useTelegram } from "./telegram";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

const AppContext = createContext({
  isLogined: false,
  setIsLogined: (val: boolean): void => {},
  telegramUser: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
  } as TelegramUser | null,
  telegramWebApp: undefined as WebApp | undefined,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { webApp, user } = useTelegram();
  const [isLogined, setIsLogined] = useState(false);
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [telegramWebApp, setTelegramWebApp] = useState<WebApp | undefined>(
    undefined
  );

  useEffect(() => {
    if (user?.id) {
      setTelegramUser(user);
      if (sessionStorage.getItem("auth") === null) {
      } else {
      }
    }
    if (webApp) {
      setTelegramWebApp(webApp);
    }
  }, [isLogined, user]);

  const handleLogin = (val: boolean) => {
    setIsLogined(val);
  };
  return (
    <AppContext.Provider
      value={{ isLogined, setIsLogined, telegramUser, telegramWebApp }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
