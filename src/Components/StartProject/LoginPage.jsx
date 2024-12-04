import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = ({
  Login, //Login Props
  showPassword, //Show Password Props
  visiblePassword, //Show Password Function props
}) => {
  const [email,setEmail] = useState('');  //Take the input user email
  const [password, setPassword] = useState('');  //Take the input user password
  const [correctEmail, setCorrectEmail] = useState('');  
  const [correctPassword, setCorrectPassword] =useState(); 
  
  const navigate = useNavigate();

  const UserLogin = (e)=>{
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const findUser = users.find((user)=>{
      if(user.email == email){
        return user;
      }
    }
  );
  if(findUser){
    if(findUser.email == email){
      if(findUser.password == password){
        alert("User Logged in successuly");
        navigate("/dashboard");
        localStorage.setItem("currentUser", JSON.stringify(findUser))
      }
      else{
       setCorrectPassword("Please enter a valid password")
      }
    }
    else{
      setCorrectEmail("Please enter a valid email")
    }
  }
}

const Email = (e)=>{
  setEmail(e.target.value);
  setCorrectEmail("");
 
}

const Password = (e)=>{
  setPassword(e.target.value);
  setCorrectPassword("");
}



  return (
    <div className={styles.rightPane}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={UserLogin}>
          <div className={styles.inputGroup}>
            <img src="icon (1).png" />
            <input
             value={email}
             onChange={Email}
             type="email" placeholder="Email" />
             <p className={styles.correctEmail}>{correctEmail}</p>
          </div>
          
          <div className={styles.inputGroup}>
            <img src="lock.png" />
            <input
              value={password}
              onChange={Password}
              type={showPassword ? "password" : "text"}
              placeholder="Password"
            />
            <img
              onClick={visiblePassword}
              src={showPassword ? "view.png" : "closed.png"}
            />
          </div>
          <p className={styles.correctPassword}>{correctPassword}</p>
          <button type="submit" className={styles.loginButton}>
            Log in
          </button>
        </form>
        <p className={styles.para}>Have no account yet?</p>
        <button onClick={Login} className={styles.register}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
