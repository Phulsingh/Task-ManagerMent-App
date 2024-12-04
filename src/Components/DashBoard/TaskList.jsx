import React, { useEffect, useState } from "react";
import styles from "./TaskList.module.css";

const TaskList = ({
  e,
  index,
  setEditedData,
  setShowDelete,
  setBackLogTasks,
  setDoneTasks,
  setInProgressTasks,
  AllTasks,
  setAllTask,
}) => {
  const [selectTask, setSelectTask] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null); // Store the active dropdown task ID
  const [editButton, setEditButton] = useState(null);

  // Function to toggle the dropdown for a specific task
  const toggleDropdown = (taskId) => {
    setActiveDropdown((prev) => (prev === taskId ? null : taskId));
  };

  // Function to toggle the EditButton for a specific task
  const toggleEditButton = (taskId) => {
    setEditButton((prev) => (prev === taskId ? null : taskId));
  };

  function formatDate(dateStr) {
    // Split the stored date (e.g., "2024-11-01") by "-"
    const [year, month, day] = dateStr.split("-");

    // Create a Date object using the parsed year, month, and day
    const date = new Date(year, month - 1, day); // month is zero-based in JavaScript Date

    // Format the date to "Month Day" (e.g., "Nov 1")
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const changeCategory = (newCategory) => {
    const removedTask = AllTasks.filter((fil) => fil._id !== e._id);
    setAllTask(removedTask);
    if (newCategory === "Backlog") {
      setBackLogTasks((prev) => [...prev, { ...e, category: "BackLog" }]);
    } else if (newCategory === "Progress") {
      setInProgressTasks((prev) => [...prev, { ...e, category: "InProgress" }]);
    } else {
      setDoneTasks((prev) => [...prev, { ...e, category: "DONE" }]);
    }
  };

  return (
    <div key={index} className={styles.taskLists}>
      <div className={styles.prioritySelection}>
        <div className={styles.prioritySeledctedImg}>
          <img
            src={
              e.priority === "HIGH"
                ? "red.png"
                : e.priority === "MODERATE"
                ? "blue.png"
                : "green.png"
            }
            alt="Priority Icon"
          />
          <p>{e.priority} PRIORITY</p>
        </div>
        <img
          onClick={() => toggleEditButton(index)}
          src="Group 544.png"
          alt="img"
        />
      </div>

      {editButton === index && (
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
            }}
            className={styles.delEditShare}
          >
            <button
              onClick={() => {
                setEditedData(e);
              }}
            >
              Edit{" "}
            </button>
            <button>Share</button>
            <button
              onClick={() => setShowDelete(e._id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <h3>{e.taskTittle}</h3>
      <div className={styles.dropDownDiv}>
        <p>
          Checklist ({selectTask}/{e.tasks.length || 0})
        </p>
        <div className={styles.dropDownImg}>
          <img
            onClick={() => toggleDropdown(index)}
            src="Arrow - Down 2.png"
            alt="dropdown"
          />
        </div>
      </div>
      <div className={styles.itmsShow}>
        {activeDropdown === index && (
          <div className={styles.cheklistArray}>
            {e.tasks.map((task, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #5A5A5A",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  borderRadius: "10px",
                  padding: "10px",
                  gap: "20px",
                  marginBotton: "50px",
                }}
              >
                <input
                  key={index}
                  type="checkbox"
                  onChange={(ev) =>
                    setSelectTask((prev) =>
                      ev.target.checked ? prev + 1 : prev - 1
                    )
                  }
                />
                {task}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.AllButtons}>
        <div>
          {e.dueDate && (
            <button
              className={styles.duedate}
            >
              {formatDate(e.dueDate)}
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => changeCategory("Backlog")}>Backlog</button>
          <button onClick={() => changeCategory("Progress")}>Progress</button>
          <button onClick={() => changeCategory("Done")}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
