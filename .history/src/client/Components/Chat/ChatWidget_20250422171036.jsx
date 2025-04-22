// ChatWidget.jsx
import { useState, useRef, useEffect } from "react";
import "../../Styles/ChatWidget.scss";
import { Smile } from "lucide-react";
import { BsChatDots } from "react-icons/bs";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What products do you offer?",
    "How can I get technical support?",
    "What are your business hours?",
    "Request a product demo",
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: text,
      sender: "user",
      time: formatTime(),
      date: formatDate(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    // Simulate reply after a delay
    setTimeout(() => {
      handleBotResponse(text);
    }, 1000);
  };

  const handleBotResponse = (userMessage) => {
    let botResponse;

    if (userMessage.toLowerCase().includes("product")) {
      botResponse =
        "We offer a wide range of technology products including smart devices, networking solutions, and enterprise software.";
    } else if (userMessage.toLowerCase().includes("support")) {
      botResponse =
        "Our technical support team is available 24/7. You can also check our knowledge base for quick answers.";
    } else if (userMessage.toLowerCase().includes("hours")) {
      botResponse = "Our business hours are Monday to Friday, 9AM to 6PM EST.";
    } else if (userMessage.toLowerCase().includes("demo")) {
      botResponse =
        "I'd be happy to arrange a product demo for you. Would you like to speak with an operator to schedule one?";
    } else {
      botResponse =
        "Thank you for your message. Would you like to speak with an operator?";
    }

    const newBotMessage = {
      id: Date.now(),
      text: botResponse,
      sender: "bot",
      time: formatTime(),
      date: formatDate(),
    };

    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    setShowQuickQuestions(false);
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const connectToOperator = () => {
    const operatorMessage = {
      id: Date.now(),
      text: "Connecting you to an operator. Please wait a moment...",
      sender: "bot",
      time: formatTime(),
      date: formatDate(),
    };

    setMessages((prevMessages) => [...prevMessages, operatorMessage]);

    // Simulate operator connection after a delay
    setTimeout(() => {
      const connectedMessage = {
        id: Date.now(),
        text: "Hello! This is Operator Sarah. How can I assist you today?",
        sender: "operator",
        time: formatTime(),
        date: formatDate(),
      };

      setMessages((prevMessages) => [...prevMessages, connectedMessage]);
    }, 2000);
  };

  const sendEmoji = () => {
    const emojiMessage = {
      id: Date.now(),
      text: "😊",
      sender: "user",
      time: formatTime(),
      date: formatDate(),
    };

    setMessages((prevMessages) => [...prevMessages, emojiMessage]);

    // Simulate reply after a delay
    setTimeout(() => {
      const botEmojiResponse = {
        id: Date.now(),
        text: "😊 How can I help you today?",
        sender: "bot",
        time: formatTime(),
        date: formatDate(),
      };

      setMessages((prevMessages) => [...prevMessages, botEmojiResponse]);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chatWidget">
      <button
        className={`chatButton ${isOpen ? "active" : ""}`}
        onClick={toggleChat}
      >
        <i>
          {" "}
          <BsChatDots />
        </i>
      </button>

      <div className={`chatContainer ${isOpen ? "open" : ""}`}>
        <div className="chatHeader">
          <h3>Admin</h3>
          <button className="closeButton" onClick={toggleChat}>
            <i>
              <IoClose />
            </i>
          </button>
        </div>

        <div className="chatMessages">
          {messages.length === 0 && (
            <div className="welcomeMessage">
              <p>Welcome to our support chat! How can we help you today?</p>
              <span className="messageTime">{formatTime()}</span>
              <span className="messageDate">{formatDate()}</span>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender}Message`}
            >
              <div className="messageContent">
                <p>{message.text}</p>
                <div className="messageMetadata">
                  <span className="messageTime">{message.time}</span>
                  <span className="messageDate">{message.date}</span>
                </div>
              </div>
            </div>
          ))}

          {showQuickQuestions && messages.length === 0 && (
            <div className="quickQuestions">
              <p>Frequently Asked Questions:</p>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quickQuestion"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {messages.length > 0 &&
            messages[messages.length - 1].sender === "bot" && (
              <div className="operatorOption">
                <button onClick={connectToOperator}>
                  Connect to an operator
                </button>
              </div>
            )}

          <div ref={messagesEndRef} />
        </div>

        <form className="chatInputForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="button" className="emojiButton" onClick={sendEmoji}>
            <Smile size={20} />
          </button>
          <button type="submit" className="sendButton">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;
