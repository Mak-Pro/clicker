import Image from "next/image";
import { Button } from "@/components";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";

export const Invite = () => {
  return (
    <div className={styles.invite}>
      <div className={styles.invite__header}>
        <Image src="/icons/friends.svg" width={48} height={48} alt="friends" />
        <span>0 Friends</span>
      </div>
      <div className={styles.invite__body}>
        <div className={styles.levels}>
          <div className={styles.levels__header}>
            <h2>
              +2,500 Coins <span>For Invite</span>
            </h2>
            <p>
              You’ll get 2500 Coins for every invite. Your friends will earn you
              huge referral prizes:
            </p>
          </div>
          <div className={styles.levels__body}>
            <div className={styles.levels__list}>
              <div className={styles.levels__list_item}>
                <div className={styles.levels__list_item_type}>
                  <Image
                    src="/icons/level-1.svg"
                    width={30}
                    height={30}
                    alt="level-1"
                  />{" "}
                  Level 1
                </div>
                <div className={styles.levels__list_item_points}>
                  +12,500 Coins
                </div>
              </div>

              <div className={styles.levels__list_item}>
                <div className={styles.levels__list_item_type}>
                  <Image
                    src="/icons/level-2.svg"
                    width={30}
                    height={30}
                    alt="level-2"
                  />{" "}
                  Level 2
                </div>
                <div className={styles.levels__list_item_points}>
                  +25,500 Coins
                </div>
              </div>

              <div className={styles.levels__list_item}>
                <div className={styles.levels__list_item_type}>
                  <Image
                    src="/icons/level-3.svg"
                    width={30}
                    height={30}
                    alt="level-3"
                  />{" "}
                  Level 3
                </div>
                <div className={styles.levels__list_item_points}>
                  +30,500 Coins
                </div>
              </div>

              <div className={styles.levels__list_item}>
                <div className={styles.levels__list_item_type}>
                  <Image
                    src="/icons/level-4.svg"
                    width={30}
                    height={30}
                    alt="level-4"
                  />{" "}
                  Level 4
                </div>
                <div className={styles.levels__list_item_points}>
                  +40,500 Coins
                </div>
              </div>

              <div className={styles.levels__list_item}>
                <div className={styles.levels__list_item_type}>
                  <Image
                    src="/icons/level-5.svg"
                    width={30}
                    height={30}
                    alt="level-5"
                  />{" "}
                  Level 5
                </div>
                <div className={styles.levels__list_item_points}>
                  +50,000 Coins
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.invite__footer}>
        <Button variant="filled" type="large" color={cssVariables.blue}>
          Invite Friends
        </Button>
        <Button variant="filled" type="large" color={cssVariables.blue}>
          <Image src="/icons/link.svg" width={26} height={26} alt="link" />
        </Button>
      </div>
    </div>
  );
};
