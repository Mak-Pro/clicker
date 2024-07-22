"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTelegram } from "@/providers/telegram";
import Lottie from "lottie-react";
import { InfoBox, Navigation } from "@/components";
import startAnimation from "@/assets/json/start.json";
import finishAnimation from "@/assets/json/finish.json";
import idleAnimation from "@/assets/json/idle.json";
import idleTapAnimation from "@/assets/json/idle-taping.json";
import styles from "./style.module.scss";
import { cssVariables } from "@/assets/styles/variables";

interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

const totalScore = 5000;
const totalEnergy = 1000;

export const Clicker = () => {
  const { webApp } = useTelegram();
  const [score, setScore] = useState(0);
  const [dayScore, setDayScore] = useState(totalScore);
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [counter, setCounter] = useState<number>(totalEnergy);
  const [end, setEnd] = useState(false);

  const [isTapping, setIsTapping] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);

  // animation
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const animationRef = useRef<any>(null);

  // touchstart
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const newTouchPoints: any = Array.from(event.changedTouches).map(
      (touch) => ({
        id: `${touch.identifier}-${Date.now()}`,
        x: touch.clientX,
        y: touch.clientY,
      })
    );
    setDayScore((prevScore) => prevScore - newTouchPoints.length);
    setTouchPoints((prevPoints) => [...prevPoints, ...newTouchPoints]);
    setScore((prevScore) => prevScore + event.changedTouches.length);
    setCounter((prevCounter) =>
      Math.max(prevCounter - event.changedTouches.length, 0)
    );

    dayScore <= 1 && setEnd(true);

    setTimeout(() => {
      setTouchPoints((prevPoints) =>
        prevPoints.filter(
          (point) =>
            !newTouchPoints.some(
              (newPoint: TouchPoint) => newPoint.id === point.id
            )
        )
      );
    }, 1100);

    if (currentAnimation === "idle") {
      setCurrentAnimation("start");
    }
  };

  // touchend
  const handleTouchEnd = () => {
    if (currentAnimation === "idleTap" && !isTapping) {
      animationRef.current.loop = false;
      animationRef.current.stop();
      setCurrentAnimation("finish");
    }
  };

  useEffect(() => {
    webApp?.ready();

    if (typeof window !== undefined) {
      const overflow = 100;
      document.body.style.overflowY = "hidden";
      document.body.style.marginTop = `${overflow}px`;
      document.body.style.height = window.innerHeight + overflow + "px";
      document.body.style.paddingBottom = `${overflow}px`;
      window.scrollTo(0, overflow);

      let ts: number | undefined;
      const onTouchStart = (e: TouchEvent) => {
        ts = e.touches[0].clientY;
      };
      document.documentElement.addEventListener("touchstart", onTouchStart, {
        passive: false,
      });
    }

    const interval = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter < 1000 ? prevCounter + 1 : prevCounter
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // animation
  useEffect(() => {
    const handleTap = () => {
      setIsTapping(true);
      setLastTapTime(Date.now() as number);
    };

    const handleTimeout = () => {
      if (Date.now() - lastTapTime >= 2000) {
        setIsTapping(false);
      }
    };

    const tapTimeout = setInterval(handleTimeout, 10);

    document.addEventListener("click", handleTap);

    return () => {
      clearInterval(tapTimeout);
      document.removeEventListener("click", handleTap);
    };
  }, [lastTapTime]);

  const renderAnimation = () => {
    switch (currentAnimation) {
      case "start":
        return (
          <Lottie
            animationData={startAnimation}
            loop={false}
            onComplete={() => setCurrentAnimation("idleTap")}
          />
        );
      case "idleTap":
        return (
          <Lottie
            animationData={idleTapAnimation}
            loop={true}
            autoPlay={true}
            lottieRef={animationRef}
            onLoopComplete={() => {
              !isTapping && setCurrentAnimation("finish");
            }}
          />
        );
      case "finish":
        return (
          <Lottie
            animationData={finishAnimation}
            loop={false}
            autoPlay={true}
            onComplete={() => {
              setCurrentAnimation("idle");
            }}
          />
        );
      case "idle":
      default:
        return (
          <Lottie animationData={idleAnimation} loop={true} autoPlay={true} />
        );
    }
  };

  return (
    <>
      <div className={styles.clicker}>
        <div className={styles.clicker__topbar}>
          <div className={styles.clicker__topbar_avatar}>
            <Image
              src="/images/avatar.svg"
              width={50}
              height={66.3}
              alt="jinn"
            />{" "}
            <span>Emojinn</span>
          </div>
          <div className={styles.clicker__topbar_level}>
            <Image
              src={`/icons/level-${1}.svg`}
              width={30}
              height={30}
              alt="level"
            />
            Level 1
          </div>
        </div>
        <div className={styles.clicker__scores}>
          <Image src="/icons/coin.svg" width={48} height={48} alt="score" />
          <span>{score} Coins</span>
        </div>
        <div className={styles.clicker__action}>
          <div
            className={`${styles.clicker__action_hero} ${
              end ? styles.clicker__action_hero_disabled : ""
            }`}
            onTouchStart={!end ? handleTouchStart : () => {}}
            onTouchEnd={handleTouchEnd}
          >
            {renderAnimation()}
          </div>
          <AnimatePresence>
            {touchPoints.map((touch: TouchPoint) => (
              <motion.div
                key={touch.id}
                className={styles.clicker__action_point}
                style={{
                  left: touch.x,
                  top: touch.y,
                }}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -50 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                1
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className={styles.clicker__footer}>
          <div className={styles.clicker__footer__top}>
            <InfoBox
              icon="/icons/lamp.svg"
              counter={{ current: dayScore, total: totalScore }}
              description="Lamp Upgrade"
              bgColor={cssVariables.purple}
            />
            <InfoBox
              icon="/icons/mana.svg"
              counter={{ current: counter, total: totalEnergy }}
              description="Mana"
              bgColor={cssVariables.yellow}
            />
          </div>
          <div className={styles.clicker__footer__bottom}>
            <Navigation />
          </div>
        </div>
      </div>
    </>
  );
};
