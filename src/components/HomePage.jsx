import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import Rope from '../images/Rope.png'; 
import Stickman from '../images/Stickman.png';

function HomePage() {
  const navigate = useNavigate();

  return (
  <div class="Home-container">
    <div class="left-content">
      <p>
        <span className="title-the">The</span> <br />
        <span className="title-hangman">Hangman</span>
      </p>
      <div class="buttons">
        <button onClick={() => navigate('/login')}>Log in</button>
        <button onClick={() => navigate('/register')}>Register</button> 
      </div>
    </div>
    <div class="right-content">
      <img src={Rope} alt="Rope image" className="image1" />
      <img src={Stickman} alt="Stickman image" className="image2" />

    </div>
  </div>
  );
} 

  export default HomePage;