import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to MyChatApp</h1>
      <p>
        Your go-to platform for seamless communication. Chat with ease, connect
        with your friends, and explore endless possibilities.
      </p>
      <button onClick={() => (window.location.href = "/chat")}>
        Get Started
      </button>
    </div>
  );
};

export default Home;
