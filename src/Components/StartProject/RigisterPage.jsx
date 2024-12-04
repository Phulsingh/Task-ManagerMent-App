import React, { useState } from "react";
import styles from "./RegisterPage.module.css";

const RigisterPage = ({
  Login,
  visibleConformPasswprd,
  visiblePassword,
  showPassword,
  showConformPassword,
}) => {
  const [name, setName] = useState(""); //Save the name to Localstorage
  const [email, setEmail] = useState(""); //Save the email to Localstorage
  const [conformPassword, setConformPassword] = useState("");
  const [password, setPassword] = useState(""); //Save the password to Localstorage

  const [requireName, setRequireName] = useState(""); //Print the msg name is required
  const [requireEmail, setRequireEmail] = useState(""); //Print the msg email is required
  const [requirePassword, setRequirePassword] = useState(""); //Print the msg conformPassword is required
  const [requireConformPassoword, setRequireConformPasswrd] = useState(""); //Print the msg password is required

  const RegisterUser = (e) => {
    e.preventDefault();
    if (name == "") {
      setRequireName("Name is require");
    } else if (email == "") {
      setRequireEmail("Email is required");
    } else if (conformPassword == "") {
      setRequireConformPasswrd("Conform Password is required");
    } else if (password == "") {
      setRequirePassword("Password is require");
    } else {
      if (password == conformPassword) {
        const newUser = { name, email, password };
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        setName("");
        setEmail("");
        setPassword("");
        setConformPassword("");
      } else {
        alert("Password does not match");
      }
    }
  };

  const Name = (e) => {
    setName(e.target.value);
    setRequireName(" ");
  };

  const Email = (e) => {
    setEmail(e.target.value);
    setRequireEmail("");
  };

  const Passoword = (e) => {
    setPassword(e.target.value);
    setRequirePassword("");
  };

  const ConformPassword = (e) => {
    setConformPassword(e.target.value);
    setRequireConformPasswrd("");
  };

  return (
    <div className={styles.rightPane}>
      <div className={styles.loginForm}>
        <h2>Register</h2>
        <form onSubmit={RegisterUser}>
          <div className={styles.inputGroup}>
            <img src="Profile.png" />
            <input
              type="text"
              value={name}
              onChange={Name}
              placeholder="Name"
            />
          </div>
          <p className={styles.requireName}>{requireName}</p>
          <div className={styles.inputGroup}>
            <img src="icon (1).png" />
            <input
              type="email"
              value={email}
              onChange={Email}
              placeholder="Email"
            />
          </div>
          <p className={styles.requireEmail}>{requireEmail}</p>
          <div className={styles.inputGroup}>
            <img src="lock.png" />
            <input
              type={showConformPassword ? "password" : "text"}
              value={conformPassword}
              onChange={ConformPassword}
              placeholder="Conform Password"
              minLength={8}
            />
            <img
              onClick={visibleConformPasswprd}
              src={showConformPassword ? "view.png" : "closed.png"}
            />
          </div>
          <p className={styles.requireConformPassoword}>
            {requireConformPassoword}
          </p>
          <div className={styles.inputGroup}>
            <img src="lock.png" />
            <input
              type={showPassword ? "password" : "text"}
              value={password}
              onChange={Passoword}
              placeholder="Password"
              minLength={8}
            />
            <img
              onClick={visiblePassword}
              src={showPassword ? "view.png" : "closed.png"}
            />
          </div>
          <p className={styles.requirePassword}>{requirePassword}</p>
          <button type="submit" className={styles.loginButton}>
            Register
          </button>
        </form>
        <p className={styles.para}>Have an account ?</p>
        <button onClick={Login} className={styles.register}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default RigisterPage;
