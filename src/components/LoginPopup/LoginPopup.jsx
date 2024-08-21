import React, { useState } from 'react';
import './LoginPopup.css'; // Ensure the CSS is imported

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitted:", { email, password });
  };

  return (
    <div className="login-popup">
    <form onSubmit={handleSubmit}>
      <h2>{currState === "Login" ? "Login" : "Sign Up"}</h2>
      
      <label htmlFor={currState === "Login" ? "login-email" : "signup-email"}>Email:</label>
      <input
        type="email"
        id={currState === "Login" ? "login-email" : "signup-email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      
      <label htmlFor={currState === "Login" ? "login-password" : "signup-password"}>Password:</label>
      <input
        type="password"
        id={currState === "Login" ? "login-password" : "signup-password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
      
      {currState === "Sign Up" && (
        <>
          <label htmlFor="signup-confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="signup-confirm-password"
            placeholder="Confirm your password"
            required
          />
        </>
      )}
      
      <button type="submit">{currState === "Login" ? "Login" : "Sign Up"}</button>
      
      <p>
        {currState === "Login"
          ? "Create a New Account? "
          : "Already have an account? "}
        <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
          {currState === "Login" ? "Click here" : "Login Here"}
        </span>
      </p>
      
      <button type="button" onClick={() => setShowLogin(false)}>Close</button>
    </form>
  </div>
  );
};
export default LoginPopup;


