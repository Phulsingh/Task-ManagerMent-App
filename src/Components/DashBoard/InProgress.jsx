import React, { useState } from "react";
import styles from "./TaskList.module.css";
//import styles from "./InProgress.module.css"

const InProgress = ({ tasks }) => {
  const [selectTask, setSelectTask] = useState(0);

  return (
    <div className={styles.TodoContainer}>
      <div style={{display:"flex", height:"50px", alignItems:"center", justifyContent:"space-between", padding:"10px 20px"}}>
        <h3>In Progress</h3>
        <div className={styles.imgs}>
          <img src="codicon_collapse-all.png" />
        </div>
      </div>
      <div className={styles.AllTasksList}>
        {tasks &&
          tasks.map((e) => {
            return (
              <div className={styles.taskLists}>
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
                  <img src="Group 544.png" alt="img" />
                </div>

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
                  {/* {activeDropdown === index && (
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
                  )} */}
                </div>
                <div className={styles.AllButtons}>
                  <div>
                    {/* {e.dueDate && (
                      <button
                        style={{
                          backgroundColor:
                            e.dueDate >= currentDate ? "#767575" : "#CF3636",
                          color: e.dueDate >= currentDate ? "black" : "white",
                        }}
                        className={styles.duedate}
                      >
                        {formatDate(e.dueDate)}
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default InProgress;
