import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  //User Will logOur and Current User Will be deleted
  const logoutUser = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className={styles.sidebar}>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Are you sure you want to logout?</h2>
            <div className="modal-actions">
              <button className="logout-btn" onClick={logoutUser}>
                Yes Logout
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.sidebarHeader}>
        <img src="Manage.png" alt="manage" />
        <h2>Pro Manage</h2>
      </div>
      <div className={styles.sidebarMenu}>
        <div
          className={`${styles.sidebarMenuItem} ${
            location.pathname === "/dashboard" ? styles.active : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          <img src="layout.png" />
          <button className={styles.board}>Board</button>
        </div>
        <div
          className={`${styles.sidebarMenuItem} ${
            location.pathname === "/analitics" ? styles.active : ""
          }`}
          onClick={() => navigate("/analitics")}
        >
          <img src="database.png" />
          <button className={styles.analitics}>Analytics</button>
        </div>
        <div
          className={`${styles.sidebarMenuItem} ${
            location.pathname === "/setting" ? styles.active : ""
          }`}
          onClick={() => navigate("/setting")}
        >
          <img src="Setting.png" />
          <button className={styles.setting}>Settings</button>
        </div>
      </div>
      <div onClick={() => setShowModal(true)} className={styles.sidebarFooter}>
        <img src="Logout.png" alt="logout" />
        <button onClick={() => setShowModal(true)} className={styles.logoutBtn}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
