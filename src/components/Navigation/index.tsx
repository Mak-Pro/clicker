"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Boosters from "@public/icons/boost.svg";
import Earn from "@public/icons/earn.svg";
import Invite from "@public/icons/invite.svg";
import Settings from "@public/icons/settings.svg";
import styles from "./style.module.scss";

const navigationItems = [
  { link: "/", icon: <Boosters />, text: "Boosters" },
  { link: "/earn", icon: <Earn />, text: "Earn" },
  { link: "/invite", icon: <Invite />, text: "Invite" },
  { link: "/settings", icon: <Settings />, text: "Settings" },
];

export const Navigation = () => {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      <input type="text"/>
      {navigationItems.map((item) => (
        <div
          key={item.text}
          className={`${styles.nav__item} ${
            path === item.link ? styles.nav__item_active : ""
          }`}
        >
          <Link href={item.link} className={styles.nav__item_link}>
            Link
          </Link>
          <div className={styles.nav__item_icon}>{item.icon}</div>
          <span className={styles.nav__item_text}>{item.text}</span>
        </div>
      ))}
    </nav>
  );
};
