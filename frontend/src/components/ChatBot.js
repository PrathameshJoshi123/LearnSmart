import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa"; // Using Telegram icon for the send button
import axios from "axios"; // Importing axios
import "../styles/ChatBot.css"; // Ensure you have the correct path

const ChatBot = () => {
  const [messages, setMessages] = useState([]); // Store the messages (user & bot)
  const [userInput, setUserInput] = useState(""); // Store the current user input
  const [options, setOptions] = useState([]); // Store the options displayed to the user

  // Function to handle user input and send to backend
  const handleSendMessage = async () => {
    if (!userInput) return; // Don't send if input is empty

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: userInput },
    ]);

    // Clear the input field
    setUserInput("");

    try {
      // Send the user input to the backend API
      const response = await axios.post("YOUR_API_URL", { message: userInput });

      // Display bot's message and options (if any)
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: response.data.response },
      ]);

      if (response.data.options && response.data.options.length > 0) {
        setOptions(response.data.options); // Set the options if they exist
      } else {
        setOptions([]); // Clear options if no options are provided
      }
    } catch (error) {
      console.error("Error sending message to API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "Sorry, there was an error processing your message." },
      ]);
    }
  };

  // Function to handle option selection
  const handleOptionClick = async (selectedOption) => {
    // Add user's selected option to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: selectedOption },
    ]);

    try {
      // Send the selected option to the backend API
      const response = await axios.post("YOUR_API_URL", { message: selectedOption });

      // Display the bot's response to the option
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: response.data.response },
      ]);
      
      // Optionally, clear options after selection
      setOptions([]);
    } catch (error) {
      console.error("Error sending option to API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "Sorry, there was an error processing your selection." },
      ]);
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-window">
        {/* Display all messages */}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}-message`}>
            {message.text}
          </div>
        ))}
      </div>

      {/* Display options if available */}
      {options.length > 0 && (
        <div className="options-container">
          {options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Chat input and send button */}
      <div className="chatbot-input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>
          <FaTelegramPlane size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
