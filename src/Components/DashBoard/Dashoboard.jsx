import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./Dashboard.module.css";
import BackLog from "./BackLog";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";

const Dashoboard = () => {
  const [name, setName] = useState("");
  const [ToDoTasks, setToDoTask] = useState([]);
  const [BackLogTasks, setBackLogTasks] = useState([]);
  const [InProgressTasks, setInProgressTasks] = useState([]);
  const [DoneTasks, setDoneTasks] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to toggle the dropdown for a specific task
  const toggleDropdown = (taskId) => {
    setActiveDropdown((prev) => (prev === taskId ? null : taskId));
  };

  useEffect(() => {
    if (
      localStorage.getItem("currentUser") &&
      localStorage.getItem("currentUser") != "undefined"
    ) {
      const localName = JSON.parse(localStorage.getItem("currentUser"))?.name;
      if (localName) {
        //To upeerCase the Name of the User
        const formatedName =
          localName.charAt(0).toUpperCase() + localName.slice(1).toLowerCase();
        setName(formatedName);
      }
    }
  }, []);

  const getFormattedDate = () => {
    const date = new Date(); // Get today's date

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    // Determine suffix for the day
    const daySuffix = getDaySuffix(day);

    return `${day}${daySuffix} ${month}, ${year}`;
  };

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Suffix for 11th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || {});
    if (!currentUser.email) {
      alert("You can't add task without login ");
      navigate("/");
    }
    const storedData = JSON.parse(localStorage.getItem("taskArray")) || [];
    const taskArray = storedData.filter(
      (e) => e.assignedBy === currentUser.email
    );
    const toDoTasks = [];
    const inProgressTasks = [];
    const backLogTasks = [];
    const doneTasks = [];
    console.log(taskArray)
    taskArray.forEach((e) => {
      if (e.category === "DONE") {
        console.log('DOne',e)
        doneTasks.push(e);
      } else if (e.category === "InProgress") {
        console.log('InPROGRESS',e)

        inProgressTasks.push(e);
      } else if (e.category === "BackLog") {
        backLogTasks.push(e);
      } else {
        console.log('ELSE',e)

        toDoTasks.push(e);
      }
    });

    setToDoTask(toDoTasks);
    setInProgressTasks(inProgressTasks);
    setBackLogTasks(backLogTasks);
    setDoneTasks(doneTasks);
  }, []);

  useEffect(() => {
    const allTasks = [
      ...BackLogTasks,
      ...InProgressTasks,
      ...ToDoTasks,
      ...DoneTasks,
    ];

    // Only add non-empty arrays to localStorage
    const filteredTasks = allTasks.filter(
      (task) => task !== undefined && task !== null
    );
    if (filteredTasks.length) {
      localStorage.setItem("taskArray", JSON.stringify(filteredTasks));
    }
  }, [ToDoTasks, BackLogTasks, InProgressTasks, DoneTasks]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.MainContainer}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={styles.welComeMessage}>
            <h3>Wecome! {name} </h3>
            <p>{getFormattedDate()}</p>
          </div>
          <div className={styles.board}>
            <div className={styles.boardDiv}>
              <h2>Board</h2>
              <img src="people.png" />
              <p>Add People</p>
            </div>
            <div className={styles.week}>
              <select id="date" name="date" className={styles.noBorder}>
                <option value="this week">This week</option>
                <option value="Today">Today</option>
                <option value="this month">This month</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.mainComponent}>
          <div
            style={{
              width: "25vw",
              backgroundColor: "#4391ED1A",
              marginRight: "20px",
              borderRadius: "20px",
            }}
          >
            <BackLog tasks={BackLogTasks} toggleDropdown={toggleDropdown} activeDropdown={activeDropdown} />
          </div>
          <div
            style={{
              width: "25vw",
              backgroundColor: "#4391ED1A",
              marginRight: "20px",
              borderRadius: "20px",
            }}
          >
            <Todo
              AllTasks={ToDoTasks}
              setAllTask={setToDoTask}
              setBackLogTasks={setBackLogTasks}
              setDoneTasks={setDoneTasks}
              setInProgressTasks={setInProgressTasks}
            />
          </div>
          <div
            style={{
              width: "25vw",
              backgroundColor: "#4391ED1A",
              marginRight: "20px",
              borderRadius: "20px",
            }}
          >
            <InProgress tasks={InProgressTasks} />
          </div>
          <div
            style={{
              width: "25vw",
              backgroundColor: "#4391ED1A",
              borderRadius: "20px",
            }}
          >
            <Done tasks={DoneTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashoboard;
