import Image from "next/image";
import styles from "./style.module.scss";
import { InfoBoxProps } from "@/Types";
import { cssVariables } from "@/assets/styles/variables";

export const InfoBox = ({
  icon,
  counter: { current, total },
  description,
  bgColor,
}: InfoBoxProps) => {
  return (
    <div
      className={styles.infobox}
      style={{ backgroundColor: bgColor ? bgColor : cssVariables.white }}
    >
      <Image src={icon} width={32} height={32} alt={description} />
      <div className={styles.infobox__stats}>
        <div className={styles.infobox__points}>
          <span>{current}</span>
          <i>/{total}</i>
        </div>
        <div className={styles.infobox__note}>{description}</div>
      </div>
    </div>
  );
};
