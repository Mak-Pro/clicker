"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";

interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

const totalScore = 5000;
const totalEnergy = 1000;

export const Clicker = () => {
  const [score, setScore] = useState(0);
  const [dayScore, setDayScore] = useState(totalScore);
  const [energy, setEnergy] = useState(totalEnergy);
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [animateImage, setAnimateImage] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1000);
  const [end, setEnd] = useState(false);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const newTouchPoints: any = Array.from(event.changedTouches).map(
      (touch) => ({
        id: `${touch.identifier}-${Date.now()}`,
        x: touch.clientX,
        y: touch.clientY,
      })
    );
    setDayScore((prevScore) => prevScore - newTouchPoints.length);
    setEnergy((prevEnergy) => prevEnergy - newTouchPoints.length);
    setTouchPoints((prevPoints) => [...prevPoints, ...newTouchPoints]);
    setScore((prevScore) => prevScore + event.changedTouches.length);
    setCounter((prevCounter) =>
      Math.max(prevCounter - event.changedTouches.length, 0)
    );

    dayScore <= 1 && setEnd(true);

    // Trigger image animation
    setAnimateImage(true);
    setTimeout(() => setAnimateImage(false), 50); // Duration of the animation

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
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter < 1000 ? prevCounter + 1 : prevCounter
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.clicker}>
      <div className={styles.clicker__topbar}>
        <div className={styles.clicker__topbar_note}>
          <Image
            src="/images/coin-score.webp"
            width={30}
            height={30}
            alt="score"
          />{" "}
          1 Djinny Token
        </div>
        <div className={styles.clicker__topbar_gift}>+500.000</div>
      </div>
      <div className={styles.clicker__scores}>
        <Image
          src="/images/coin-score.webp"
          width={30}
          height={30}
          alt="score"
        />
        <span>{score}</span>
      </div>
      <div className={styles.clicker__action}>
        <div
          className={`${styles.clicker__action_hero} ${
            end ? styles.clicker__action_hero_disabled : ""
          }`}
          onTouchStart={!end ? handleTouchStart : () => {}}
        >
          <motion.img
            src="/images/emojinn.png"
            alt="emojinn"
            animate={animateImage ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
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
          <div className={styles.clicker__progress}>
            <div className={styles.clicker__progress_stats}>
              <Image
                src="/images/heart.svg"
                width={30}
                height={30}
                alt="score"
              />
              <div className={styles.clicker__progress_stats_text}>
                <span>{dayScore}</span>
                <i>{totalScore}</i>
              </div>
            </div>
            <div className={styles.clicker__progress_bar}>
              <span
                style={{ width: `${(dayScore / totalScore) * 100}%` }}
              ></span>
            </div>
          </div>
          <div className={styles.clicker__energy}>
            <Image
              src="/images/energy.svg"
              width={40}
              height={40}
              alt="score"
            />
            <div className={styles.clicker__energy_text}>
              <span>{counter}</span>
              <i>/{totalEnergy}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
