import React, { useState, useEffect } from "react";
const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: 400,
    height: "80vh",
    margin: "40px auto",
    borderRadius: 20,
    background: "linear-gradient(270deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #84fab0, #8fd3f4)",
    backgroundSize: "1200% 1200%",
    animation: "bgShift 20s ease infinite",
    boxShadow: "0 0 30px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  chatBox: {
    flexGrow: 1,
    overflowY: "auto",
    padding: 14,
  },
  message: {
    maxWidth: "80%",
    marginBottom: 12,
    padding: "12px 16px",
    borderRadius: 24,
    fontSize: 15,
    fontWeight: 500,
    wordBreak: "break-word",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    animation: "popIn 0.4s ease",
    transition: "transform 0.2s ease-in-out",
  },
  user: {
    alignSelf: "flex-end",
    background: "linear-gradient(135deg, #42e695, #3bb2b8)",
    color: "white",
  },
  bot: {
    alignSelf: "flex-start",
    background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    color: "#222",
  },
  inputContainer: {
    display: "flex",
    borderTop: "2px solid #eee",
    background: "#ffffffcc",
    backdropFilter: "blur(6px)",
  },
  input: {
    flexGrow: 1,
    padding: "12px 16px",
    border: "none",
    borderRadius: "0 0 0 20px",
    outline: "none",
    fontSize: 16,
    background: "linear-gradient(135deg, #fff, #f0f9ff)",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s",
  },
  button: {
    padding: "0 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "0 0 20px 0",
    cursor: "pointer",
    fontSize: 16,
    transition: "background 0.3s, transform 0.2s",
  },
};
const injectAnimations = () => {
  if (document.getElementById("animatedStyles")) return;

  const style = document.createElement("style");
  style.id = "animatedStyles";
  style.innerHTML = `
    @keyframes popIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes bgShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);
};

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to Math Solver AI!" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    injectAnimations();
  }, []);

  const getAIResponse = async (userInput) => {
    return `📐 Here's a solution to: "${userInput}"`;
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    const aiResponse = await getAIResponse(input);
    const botMessage = { sender: "bot", text: aiResponse };
    setMessages((prev) => [...prev, botMessage]);
  };

  const responsiveContainer = {
    ...styles.chatContainer,
    width: window.innerWidth < 500 ? "98%" : styles.chatContainer.width,
    height: window.innerWidth < 500 ? "90vh" : styles.chatContainer.height,
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>
      <div style={responsiveContainer}>
        <div style={styles.chatBox}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.message,
                ...(msg.sender === "user" ? styles.user : styles.bot),
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            value={input}
            placeholder="Enter a math problem..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            style={styles.button}
            onClick={handleSendMessage}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.96)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatInterface;
