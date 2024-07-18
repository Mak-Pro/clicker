"use client";
import { useState } from "react";
import styles from "./style.module.scss";

export const Clicker = () => {
  const [score, setScore] = useState(0);
  const [touchPoints, setTouchPoints] = useState([]);

  const handleTouchStart = (event) => {
    const newTouchPoints = Array.from(event.touches).map((touch) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));

    setTouchPoints(newTouchPoints);
    setScore((prevScore) => prevScore + event.changedTouches.length);
  };

  const handleTouchMove = (event) => {
    const updatedTouchPoints = Array.from(event.touches).map((touch) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));

    setTouchPoints(updatedTouchPoints);
  };

  const handleTouchEnd = (event) => {
    const remainingTouchPoints = Array.from(event.touches).map((touch) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));

    setTouchPoints(remainingTouchPoints);
  };

  const styles = {
    container: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      userSelect: "none",
      touchAction: "manipulation",
    },
    touchPoint: {
      position: "absolute",
      backgroundColor: "rgba(0, 150, 0, 0.7)",
      color: "white",
      padding: "5px",
      borderRadius: "50%",
      fontSize: "16px",
      pointerEvents: "none",
    },
  };

  return (
    <div
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h1>Очки: {score}</h1>
      <p>
        Тапайте по экрану несколькими пальцами одновременно, чтобы увеличить
        счёт!
      </p>
      {touchPoints.map((touch) => (
        <div
          key={touch.id}
          style={{
            ...styles.touchPoint,
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
