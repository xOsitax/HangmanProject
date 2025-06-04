import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import Rope from "../images/Rope.png";
import Stickman from "../images/Stickman.png";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const matchedAccount = storedAccounts.find(
      (account) => account.name === name && account.password === password
    );

    if (!name || !password) {
      alert("Please fill in both fields.");
      return;
    }

    if (!matchedAccount) {
      alert("Name or password is incorrect. Please try again.");
      setName("");
      setPassword("");
      return;
    }
    navigate("/game");
  }

  return (
    <div class="Home-container">
      <div class="left-content">
        <p>
          <span className="title-the">The</span> <br />
          <span className="title-hangman">Hangman</span>
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="User Name"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <div class="buttons">
          <button onClick={handleLogin}>Log in</button>
          <button onClick={() => navigate("/")}>Back</button>
        </div> 
      </div>
      <div class="right-content">
        <img src={Rope} alt="Rope image" className="image1" />
        <img src={Stickman} alt="Stickman image" className="image2" />
      </div>
    </div>
  );
}

export default LoginForm;
