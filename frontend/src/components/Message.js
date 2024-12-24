import React from "react";
import "../styles/Message.css";

const Message = ({ sender, text }) => {
  return (
    <div className={`message-container ${sender}`}>
      {text}
    </div>
  );
};

export default Message;
