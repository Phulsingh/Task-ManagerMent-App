import React from "react";
import styles from "./Robot.module.css";

const Robot = () => {
  return (
    <div className={styles.leftPane}>
      <div className={styles.welcomeMessage}>
        <div className={styles.RobotBackGround}>
          <img src="Group.png" alt="Robot" className={styles.robotImage} />
        </div>
        <div className={styles.texts}>
          <h2>Welcome aboard my friend</h2>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
    </div>
  );
};

export default Robot;
