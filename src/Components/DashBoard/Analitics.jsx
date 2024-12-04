import React, { useEffect, useState } from "react";
import styles from "./Analitics.module.css";
import Sidebar from "./Sidebar";
import Todo from "./Todo";

const Analitics = () => {
  const [date, setDate] = useState("");
  const [high, setHigh] = useState("");
  const [moderate, setModerate] = useState("");
  const [low, setLow] = useState("");
  const [taskCount, setTaskCount] = useState({
    backlog: 0,
    inProgree: 0,
    Done: 0,
    todo:0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (!userData.email) {
      alert("Login to get Analytics");
      navigate("/");
    }
    let storedData = JSON.parse(localStorage.getItem("taskArray")) || [];

    const newData = storedData.filter((e) => e.assignedBy === userData.email);
    storedData = newData;
    //To show the DueDates
    const dueDateCount = storedData.filter(
      (task) => task.dueDate !== ""
    ).length;

    const formattedCount = dueDateCount.toString().padStart(2, "0");
    setDate(formattedCount);

    //To count the HIGH priority
    const HightPriority = storedData.filter(
      (task) => task.priority === "HIGH"
    ).length;
    const highCount = HightPriority.toString().padStart(2, "0");
    setHigh(highCount);

    //To count the MODERATE priority
    const ModeratePriority = storedData.filter(
      (task) => task.priority === "MODERATE"
    ).length;
    const moderateCount = ModeratePriority.toString().padStart(2, "0");
    setModerate(moderateCount);

    //To count the LOW priority
    const LowPriority = storedData.filter(
      (task) => task.priority === "LOW"
    ).length;
    const lowCount = LowPriority.toString().padStart(2, "0");
    setLow(lowCount);

    const count = {
      backlog: storedData.filter((task) => task.category === "BackLog").length,
      inProgree: storedData.filter((task) => task.category === "InProgress").length,
      Done: storedData.filter((task) => task.category === "DONE").length,
      todo:storedData.filter((task)=> !task.category || task.category === "").length
    };

    setTaskCount(count);
  });

  //To formate the Number if it from 1 to 9
  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div>
          <p className={styles.pTag}>Analytics</p>
          <div className={styles.MainDiv}>
            <div className={styles.contentDiv}>
              <div className={styles.headingDiv}>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <img src="Ellipse 3.png" />
                  <p>Backlogs Tasks</p>
                </div>
                <div>
                  <p style={{ position: "relative", right: "0" }}>
                    {formatNumber(taskCount.backlog)}
                  </p>
                </div>
              </div>
              <div className={styles.headingDiv}>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <img src="Ellipse 3.png" />
                  <p>To-do Tasks</p>
                </div>
                <div>
                  <p style={{ position: "relative", right: "0" }}>
                     {formatNumber(taskCount.todo)}</p>
                </div>
              </div>
              <div className={styles.headingDiv}>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <img src="Ellipse 3.png" />
                  <p>In-Progress Tasks</p>
                </div>
                <div>
                  <p style={{ position: "relative", right: "0" }}>
                    {formatNumber(taskCount.inProgree)}
                  </p>
                </div>
              </div>
              <div className={styles.headingDiv}>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <img src="Ellipse 3.png" />
                  <p>Completed Tasks</p>
                </div>
                <div>
                  <p style={{ position: "relative", right: "0" }}>
                    {formatNumber(taskCount.Done)}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.contentDiv}>
              <div className={styles.headingDiv}>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <img src="Ellipse 3.png" />
                  <p>Low Priority</p>
                </div>
                <div>
                  <p style={{ position: "relative", right: "0" }}>{low}</p>
                </div>
              </div>
              <div className={styles.headingDiv}>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <img src="Ellipse 3.png" />
                  <p>Moderate Priority</p>
                </div>
                <div>
                  <p style={{ position: "relative", right: "0" }}>{moderate}</p>
                </div>
              </div>
              <div className={styles.headingDiv}>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <img src="Ellipse 3.png" />
                  <p>High Priority</p>
                </div>
                <div>
                  <p style={{ position: "relative", right: "0" }}>{high}</p>
                </div>
              </div>
              <div className={styles.headingDiv}>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <img src="Ellipse 3.png" />
                  <p>Due Date Tasks</p>
                </div>
                <div>
                  <p style={{ position: "relative", right: "0" }}>{date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analitics;
