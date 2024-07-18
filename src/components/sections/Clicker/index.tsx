"use client";
import { useState, useEffect, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";

interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

export const Clicker = () => {
  const [score, setScore] = useState(0);
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [visiblePoints, setVisiblePoints] = useState<TouchPoint[]>([]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const newTouchPoints: TouchPoint[] = Array.from(event.changedTouches).map(
      (touch) => ({
        id: `${touch.identifier}-${Date.now()}`,
        x: touch.clientX,
        y: touch.clientY,
      })
    );

    setTouchPoints((prevPoints) => [...prevPoints, ...newTouchPoints]);
    setScore((prevScore) => prevScore + event.changedTouches.length);

    // Remove touch points after animation
    setTimeout(() => {
      setTouchPoints((prevPoints) =>
        prevPoints.filter(
          (point) =>
            !newTouchPoints.some((newPoint) => newPoint.id === point.id)
        )
      );
    }, 1100);
  };

  // const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
  //   const newTouchPoints: TouchPoint[] = Array.from(event.touches).map(
  //     (touch) => ({
  //       id: touch.identifier,
  //       x: touch.clientX,
  //       y: touch.clientY,
  //     })
  //   );

  //   setTouchPoints(newTouchPoints as any);
  //   setScore((prevScore) => prevScore + event.changedTouches.length);
  // };

  // const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
  //   const updatedTouchPoints: TouchPoint[] = Array.from(event.touches).map(
  //     (touch) => ({
  //       id: touch.identifier,
  //       x: touch.clientX,
  //       y: touch.clientY,
  //     })
  //   );

  //   setTouchPoints(updatedTouchPoints as any);
  // };

  // const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
  //   const remainingTouchPoints: TouchPoint[] = Array.from(event.touches).map(
  //     (touch) => ({
  //       id: touch.identifier,
  //       x: touch.clientX,
  //       y: touch.clientY,
  //     })
  //   );

  //   setTouchPoints(remainingTouchPoints as any);
  // };

  return (
    <div
      className={styles.clicker}
      onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
      // onTouchEnd={handleTouchStart}
    >
      <h1>Очки: {score}</h1>
      <p>
        Тапайте по экрану несколькими пальцами одновременно, чтобы увеличить
        счёт!
      </p>
      <AnimatePresence>
        {touchPoints.map((touch: TouchPoint) => (
          <motion.div
            key={touch.id}
            className={styles.touchpoint}
            style={{
              left: touch.x,
              top: touch.y,
            }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            +1
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
