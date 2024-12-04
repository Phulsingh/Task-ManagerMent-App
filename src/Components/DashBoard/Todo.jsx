import React, { useState } from "react";
import styles from "./Todo.module.css";
import CalendarModal from "../DatePicker";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";

const Todo = ({
  AllTasks,
  setAllTask,
  setBackLogTasks,
  setDoneTasks,
  setInProgressTasks,
}) => {
  const [AddTask, setAddTask] = useState(false);
  const navigate = useNavigate();
  const [taskTittle, setTaskTittle] = useState(""); //Task Tittle
  const [priority, setPriority] = useState(""); //Add priority
  const [tasks, setTasks] = useState([]); //Add the Tasks
  const [dueDate, setDueDate] = useState(""); //Due date to select
  const [totalSelectedTask, setTotalSelectedTask] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [editedData, setEditedData] = useState(undefined);
  const [showDelete, setShowDelete] = useState(undefined);

  const handleDateChange = (date) => {
    setDueDate(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD for display
    setShowCalendar(false); // Close the modal
  };

  const showAddTask = () => {
    setAddTask(!AddTask);
  };

  const HighPriority = () => {
    setPriority("HIGH");
  };
  const ModeratePriority = () => {
    setPriority("MODERATE");
  };

  const LowPriority = () => {
    setPriority("LOW");
  };

  // Function to handle adding a new task input field
  const addTaskField = () => {
    setTasks([...tasks, ""]);
  };

  // Function to handle task input change
  const handleTaskChange = (index, event) => {
    const newTasks = [...tasks];
    newTasks[index] = event.target.value;
    setTasks(newTasks);
  };

  // Function to handle task deletion
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  // Function to handle task input change
  const handleEditTaskChange = (index, event) => {
    const newTasks = [...editedData.tasks];
    newTasks[index] = event.target.value;
    setEditedData({ ...editedData, tasks: newTasks });
  };

  // Function to handle task deletion
  const handleEditDeleteTask = (index) => {
    const newTasks = editedData.tasks.filter(
      (_, taskIndex) => taskIndex !== index
    );
    setEditedData({ ...editedData, tasks: newTasks });
  };

  // Function to handle save and store data in localStorage
  const handleSave = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || {});
    if (!currentUser.email) {
      alert("You can't add task without login ");
      navigate("/");
    }
    if (!taskTittle || !priority || tasks.length === 0) {
      alert("Please fill out all the field");
      return;
    } else {
      //To save all the information of the Tasks
      const taskData = {
        _id: Date.now(),
        dueDate,
        taskTittle,
        priority,
        tasks,
        assignedBy: currentUser.email,
        category: "TODO",
      };

      console.log(taskData);

      let existingTasks = JSON.parse(localStorage.getItem("taskArray")) || [];

      existingTasks.push(taskData);
      setAllTask((prev) => [...prev, taskData]);
      setDueDate("");
      setTaskTittle("");
      setPriority("");
      setTasks([]);
      // Save the data in state
      // setSavedData(taskData);
      console.log(existingTasks);
    }
  };

  const EditTask = () => {
    const newData = AllTasks;
    const updatedData = newData.map((e) => {
      if (e._id === editedData._id) {
        return editedData;
      } else {
        return e;
      }
    });
    setAllTask([...updatedData]);
    setEditedData(undefined);
  };

  const DeleteTask = () => {
    const newData = AllTasks;
    const updatedData = newData.filter((e) => e._id !== showDelete);
    setAllTask([...updatedData]);
    setShowDelete(undefined);
  };

  return (
    <>
      <div className={styles.TodoContainer}>
        
          <h3>To do</h3>
          <div className={styles.imgs}>
            <img onClick={showAddTask} className={styles.plus} src="plus.png" />
            <img src="codicon_collapse-all.png" />
          </div>
      

        {AddTask && (
          <div className={styles.moduleOverlay}>
            <div className={styles.moduleContainer}>
              <div>
                <p>
                  Tittle<span>*</span>
                </p>
                <input
                  value={taskTittle}
                  onChange={(e) => setTaskTittle(e.target.value)}
                  type="text"
                  placeholder="Enter Task Tittle"
                />
              </div>
              <div className={styles.SelectPriority}>
                <div className={styles.selectTag}>
                  <p>Select Priority</p>
                  <span>*</span>
                </div>
                <div className={styles.priorityButton}>
                  <button
                    onClick={HighPriority}
                    style={{
                      backgroundColor: priority === "HIGH" && "#EEECEC",
                      border: priority === "HIGH" && "none",
                    }}
                  >
                    <img src="red.png" /> HIGHT PRIORITY
                  </button>
                  <button
                    onClick={ModeratePriority}
                    style={{
                      backgroundColor: priority === "MODERATE" && "#EEECEC",
                      border: priority === "MODERATE" && "none",
                    }}
                  >
                    <img src="blue.png" />
                    MODERATE PRIORITY
                  </button>
                  <button
                    onClick={LowPriority}
                    style={{
                      backgroundColor: priority === "LOW" && "#EEECEC",
                      border: priority === "LOW" && "none",
                    }}
                  >
                    <img src="green.png" />
                    LOW PRIORITY
                  </button>
                </div>
              </div>
              <div style={{ marginTop: "10px" }} className={styles.AssignTo}>
                <p>Assign to</p>
                <input
                  type="text"
                  style={{ width: "88%" }}
                  placeholder="Enter Task Tittle"
                />
              </div>
              <div className={styles.taskContainer}>
                <div className={styles.checklist}>
                  <p>
                    Checklist
                    <span style={{ color: "black" }}>
                      ({totalSelectedTask}/{tasks.length})
                    </span>
                  </p>
                  <span>*</span>
                </div>
                <div className={styles.taskList}>
                  {tasks.map((task, index) => (
                    <div
                      key={index}
                      style={{ marginTop: "10px", overflow: "auto" }}
                    >
                      <div className={styles.checklist2}>
                        <input
                          style={{ width: "5%", cursor: "pointer" }}
                          type="checkbox"
                          onChange={(e) =>
                            setTotalSelectedTask((prev) =>
                              e.target.checked ? prev + 1 : prev - 1
                            )
                          }
                        />

                        <input
                          style={{ width: "95%" }}
                          type="text"
                          value={task}
                          placeholder={`Task ${index + 1}`}
                          onChange={(event) => handleTaskChange(index, event)}
                        />
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteTask(index)}
                          src="Delete.png"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div onClick={addTaskField} className={styles.addTask}>
                  <img style={{ marginTop: "9px" }} src="plus.png" />
                  <p style={{ color: " #767575" }}>AddTask</p>
                </div>
              </div>
              <div className={styles.dateSelectorBtns}>
                <div
                  className={styles.date}
                  onClick={() => setShowCalendar(true)}
                >
                  <input
                    type="text"
                    value={dueDate}
                    readOnly
                    placeholder="Select Due Date"
                  />
                </div>
                {showCalendar && (
                  <CalendarModal
                    selectedDate={dueDate ? new Date(dueDate) : new Date()} // Ensure a valid Date object
                    onClose={() => setShowCalendar(false)}
                    onSelectDate={handleDateChange}
                  />
                )}
                <div onClick={showAddTask} className={styles.saveCancelBtn}>
                  <button
                    style={{
                      color: "#CF3636",
                      border: "1px solid #CF3636",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    style={{ backgroundColor: "#17A2B8", cursor: "pointer" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {AllTasks && AllTasks.length && (
        <div className={styles.AllTasksList}>
          {/* Display first task in the first div if it exists */}
          {AllTasks.map((e, index) => {
            return (
              <TaskList
                e={e}
                index={index}
                AllTasks={AllTasks}
                setEditedData={setEditedData}
                setShowDelete={setShowDelete}
                setAllTask={setAllTask}
                setBackLogTasks={setBackLogTasks}
                setDoneTasks={setDoneTasks}
                setInProgressTasks={setInProgressTasks}
              />
            );
          })}
        </div>
      )}
      {editedData && (
        <div className={styles.moduleOverlay}>
          <div className={styles.moduleContainer}>
            <div>
              <p>
                Tittle<span>*</span>
              </p>
              <input
                value={editedData.taskTittle}
                onChange={(e) =>
                  setEditedData((prev) => ({
                    ...prev,
                    taskTittle: e.target.value,
                  }))
                }
                type="text"
                placeholder="Enter Task Tittle"
              />
            </div>
            <div className={styles.SelectPriority}>
              <div className={styles.selectTag}>
                <p>Select Priority</p>
                <span>*</span>
              </div>
              <div className={styles.priorityButton}>
                <button
                  onClick={(e) =>
                    setEditedData((prev) => ({ ...prev, priority: "HIGH" }))
                  }
                  style={{
                    backgroundColor:
                      editedData.priority === "HIGH" && "#EEECEC",
                    border: editedData.priority === "HIGH" && "none",
                  }}
                >
                  <img src="red.png" /> HIGHT PRIORITY
                </button>
                <button
                  onClick={(e) =>
                    setEditedData((prev) => ({ ...prev, priority: "MODERATE" }))
                  }
                  style={{
                    backgroundColor:
                      editedData.priority === "MODERATE" && "#EEECEC",
                    border: editedData.priority === "MODERATE" && "none",
                  }}
                >
                  <img src="blue.png" />
                  MODERATE PRIORITY
                </button>
                <button
                  onClick={(e) =>
                    setEditedData((prev) => ({ ...prev, priority: "LOW" }))
                  }
                  style={{
                    backgroundColor: editedData.priority === "LOW" && "#EEECEC",
                    border: editedData.priority === "LOW" && "none",
                  }}
                >
                  <img src="green.png" />
                  LOW PRIORITY
                </button>
              </div>
            </div>
            {/* <div style={{ marginTop: "10px" }} className={styles.AssignTo}>
              <p>Assign to</p>
              <input
                type="text"
                style={{ width: "88%" }}
                placeholder="Enter Task Tittle"
              />
            </div> */}
            <div className={styles.taskContainer}>
              <div className={styles.checklist}>
                <p>
                  Checklist
                  <span style={{ color: "black" }}>
                    ({totalSelectedTask}/{editedData.tasks.length})
                  </span>
                </p>
                <span>*</span>
              </div>
              <div className={styles.taskList}>
                {editedData.tasks.map((task, index) => (
                  <div
                    key={index}
                    style={{ marginTop: "10px", overflow: "auto" }}
                  >
                    <div className={styles.checklist2}>
                      <input
                        style={{ width: "5%", cursor: "pointer" }}
                        type="checkbox"
                        onChange={(e) =>
                          setTotalSelectedTask((prev) =>
                            e.target.checked ? prev + 1 : prev - 1
                          )
                        }
                      />

                      <input
                        style={{ width: "95%" }}
                        type="text"
                        value={task}
                        placeholder={`Task ${index + 1}`}
                        onChange={(event) => handleEditTaskChange(index, event)}
                      />
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditDeleteTask(index)}
                        src="Delete.png"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div onClick={addTaskField} className={styles.addTask}>
                <img style={{ marginTop: "9px" }} src="plus.png" />
                <p style={{ color: " #767575" }}>AddTask</p>
              </div>
            </div>
            <div className={styles.dateSelectorBtns}>
              <div
                className={styles.date}
                onClick={() => setShowCalendar(true)}
              >
                <input
                  type="text"
                  value={editedData.dueDate}
                  readOnly
                  placeholder="Select Due Date"
                />
              </div>
              {showCalendar && (
                <CalendarModal
                  selectedDate={dueDate ? new Date(dueDate) : new Date()} // Ensure a valid Date object
                  onClose={() => setShowCalendar(false)}
                  onSelectDate={handleDateChange}
                />
              )}
              <div
                onClick={() => setEditedData(undefined)}
                className={styles.saveCancelBtn}
              >
                <button
                  style={{
                    color: "#CF3636",
                    border: "1px solid #CF3636",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={EditTask}
                  style={{ backgroundColor: "#17A2B8", cursor: "pointer" }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDelete && (
        <div className={styles.modulOverlay}>
          <div className={styles.modulContainer}>
            <div>
              <p style={{ fontSize: "15px", fontWeight: "600" }}>
                Are you sure you want to Delete?
              </p>
              <div className={styles.savCancelBtn}>
                <button
                  onClick={DeleteTask}
                  style={{
                    backgroundColor: "#17A2B8",
                    cursor: "pointer",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDelete(undefined)}
                  style={{
                    color: "#CF3636",
                    border: "1px solid #CF3636",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
