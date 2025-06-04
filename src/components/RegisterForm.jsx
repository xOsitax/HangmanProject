import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import Rope from "../images/Rope.png";
import Stickman from "../images/Stickman.png";

function RegisterForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    if (!name || !password) {
      alert("Please fill in both fields.");
      return;
    }

    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

    if (storedAccounts.some((account) => account.name === name)) {
      alert("This account already exists.");
      return;
    }

    const newAccount = { name, password };
    storedAccounts.push(newAccount);

    localStorage.setItem("accounts", JSON.stringify(storedAccounts));
    alert("Registration successful!");

    navigate("/login");

    setName("");
    setPassword("");
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
          placeholder="Name"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div class="buttons">
          <button onClick={handleRegister}>Create Account</button>
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

export default RegisterForm;
