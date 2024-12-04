import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import styles from "./Setting.module.css";

const Setting = () => {
  // State to toggle old and new password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // State to store the currently logged-in user
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  // State to store new input values for updating user details
  const [newValue, setNewValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Load the current user data from localStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  // Update the newValue state whenever the user types in an input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewValue(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to update user data
  const handleUpdate = (e) => {
    e.preventDefault();

    // Clone the current user data
    let updatedUser = { ...currentUser };
    let fieldsUpdated = 0; // To count how many fields are being updated

    // Check each field for updates and increment fieldsUpdated count if a field is changed
    if (newValue.name.trim() !== '') {
      updatedUser.name = newValue.name;
      fieldsUpdated += 1;
    }
    if (newValue.email.trim() !== '') {
      updatedUser.email = newValue.email;
      fieldsUpdated += 1;
    }
    if (newValue.password.trim() !== '') {
      updatedUser.password = newValue.password;
      fieldsUpdated += 1;
    }

    // Only allow updates if exactly one field is changed
    if (fieldsUpdated === 1) {
      // Save the updated user to localStorage as currentUser
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      // Retrieve the registered users list, update the specific user, and save back to localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) =>
        user.email === currentUser.email ? updatedUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      alert("User profile updated!");
      
      // Reset the input fields after update
      setNewValue({ name: '', email: '', password: '' });
    } else if (fieldsUpdated > 1) {
      alert("Please update only one field at a time.");
    } else {
      alert("Please enter a value to update.");
    }
  };

  // Toggle visibility of old and new password fields
  const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div>
        <p className={styles.pTag}>Setting</p>
        <div className={styles.mainContainer}>
          {/* Input for updating user name */}
          <div className={styles.EachDive}>
            <img src="Profile.png" alt="Profile Icon" />
            <input
              name="name"
              value={newValue.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter new Name"
            />
          </div>

          {/* Input for updating user email */}
          <div className={styles.EachDive}>
            <img src="icon (1).png" alt="Email Icon" />
            <input
              name="email"
              value={newValue.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter new Email"
            />
          </div>

          {/* Input for entering old password */}
          <div className={styles.EachDive}>
            <img src="lock.png" alt="Old Password Icon" />
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
            />
            <img
              onClick={toggleOldPasswordVisibility}
              style={{ marginLeft: "90px" }}
              src={showOldPassword ? "closed.png" : "view.png"}
              alt="Toggle Old Password Visibility"
            />
          </div>

          {/* Input for entering new password */}
          <div className={styles.EachDive}>
            <img src="lock.png" alt="New Password Icon" />
            <input
              name="password"
              value={newValue.password}
              onChange={handleChange}
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
            />
            <img
              onClick={toggleNewPasswordVisibility}
              style={{ marginLeft: "90px" }}
              src={showNewPassword ? "closed.png" : "view.png"}
              alt="Toggle New Password Visibility"
            />
          </div>

          {/* Update button */}
          <div onClick={handleUpdate} className={styles.EachDivbutton}>
            <button>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
