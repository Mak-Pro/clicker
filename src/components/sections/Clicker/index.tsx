"use client";
import { useState, TouchEvent } from "react";
import styles from "./style.module.scss";

interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

export const Clicker = () => {
  const [score, setScore] = useState(0);
  const [touchPoints, setTouchPoints] = useState([]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const newTouchPoints: TouchPoint[] = Array.from(event.touches).map(
      (touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      })
    );

    setTouchPoints(newTouchPoints as any);
    setScore((prevScore) => prevScore + event.changedTouches.length);
  };

  // const handleTouchMove = (event) => {
  //   const updatedTouchPoints: TouchPoint[] = Array.from(event.touches).map((touch) => ({
  //     id: touch.identifier,
  //     x: touch.clientX,
  //     y: touch.clientY,
  //   }));

  //   setTouchPoints(updatedTouchPoints);
  // };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const remainingTouchPoints: TouchPoint[] = Array.from(event.touches).map(
      (touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
      })
    );

    setTouchPoints(remainingTouchPoints as any);
  };

  return (
    <div
      className={styles.clicker}
      onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h1>Очки: {score}</h1>
      <p>
        Тапайте по экрану несколькими пальцами одновременно, чтобы увеличить
        счёт!
      </p>
      {touchPoints.map((touch: TouchPoint) => (
        <div
          key={touch.id}
          className={styles.touchpoint}
          style={{
            left: touch.x,
            top: touch.y,
          }}
        >
          +1
        </div>
      ))}
    </div>
  );
};
