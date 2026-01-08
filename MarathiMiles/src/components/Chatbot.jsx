import React, { useState, useRef, useEffect } from "react";
import './Chatbot.css';

const Chatbot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! मी तुमचा मराठी चॅटबॉट आहे. महाराष्ट्राबद्दल तुम्हाला कशी मदत हवे?",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("marathi"); // 'marathi' or 'english'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Handle chatbot toggle
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Handle language toggle
  const toggleLanguage = () => {
    setLanguage(language === "marathi" ? "english" : "marathi");
  };

  // Simulate AI response - Replace this with actual API call
  const getAIResponse = async (userMessage) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const marathiResponses = [
      "महाराष्ट्रातील सर्वोत्तम पर्यटन स्थळांसाठी, मी पुणे, मुंबई, नाशिक आणि औरंगाबादची शिफारस करतो!",
      "तुमच्या पासपोर्टसाठी, तुम्हाला जवळच्या पासपोर्ट कार्यालयात भेट द्यावी लागेल.",
      "हवामानानुसार प्रवासाच्या सूचनांसाठी, मी कोकण किनारा किंवा पश्चिम घाटाची शिफारस करतो!",
      "मराठी संस्कृतीचा अनुभव घेण्यासाठी, स्थानिक उत्सव आणि जेवणाचा आस्वाद घ्या!",
      "महाराष्ट्रातील प्रसिद्ध पक्वान्रांसाठी, पुरण पोळी, मिसळ पाव आणि वडा पाव यांचा चव घेणं नको विसरू!",
    ];

    const englishResponses = [
      "For the best tourist places in Maharashtra, I recommend Pune, Mumbai, Nashik, and Aurangabad!",
      "For your passport, you'll need to visit the nearest passport office.",
      "For weather-based travel suggestions, I recommend the Konkan coast or the Western Ghats!",
      "To experience Marathi culture, try local festivals and traditional food!",
      "For famous Maharashtrian dishes, don't forget to try Puran Poli, Misal Pav, and Vada Pav!",
    ];

    const responses = language === "marathi" ? marathiResponses : englishResponses;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || isLoading) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
    };

    setChatMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse(inputMessage);
      
      const newBotMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
      };

      setChatMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage = language === "marathi" 
        ? "माफ करा, काही त्रुटी आली आहे. कृपया पुन्हा प्रयत्न करा." 
        : "Sorry, there was an error. Please try again.";
      
      const errorBotMessage = {
        id: Date.now() + 1,
        text: errorMessage,
        isUser: false,
      };
      setChatMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press for chat input
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Initial greeting based on language
  useEffect(() => {
    if (chatMessages.length === 1) {
      const greeting = language === "marathi" 
        ? "नमस्ते! मी तुमचा मराठी चॅटबॉट आहे. महाराष्ट्राबद्दल तुम्हाला कशी मदत हवे?"
        : "Hello! I'm your Marathi chatbot. How can I help you with Maharashtra?";
      
      setChatMessages([{
        id: 1,
        text: greeting,
        isUser: false,
      }]);
    }
  }, [language]);

  return (
    <>
      {/* Overlay */}
      {isChatbotOpen && (
        <div 
          className={`chatbot-overlay ${isChatbotOpen ? 'open' : ''}`}
          onClick={toggleChatbot}
        />
      )}
      
      <div className="chatbot-container">
        <div className="chatbot-toggle" onClick={toggleChatbot}>
          <i className="fas fa-comments"></i>
          <span className="chatbot-badge">
            {language === "marathi" ? "मदत" : "Help"}
          </span>
        </div>

        <div className={`chatbot-window ${isChatbotOpen ? 'open' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-title">
              <i className="fas fa-robot"></i>
              <h3>
                {language === "marathi" ? "मराठी चॅटबॉट" : "Marathi Chatbot"}
              </h3>
            </div>
            <div className="chatbot-controls">
              <button 
                className="language-toggle"
                onClick={toggleLanguage}
              >
                {language === "marathi" ? "English" : "मराठी"}
              </button>
              <i
                className="fas fa-times close-chatbot"
                onClick={toggleChatbot}
              ></i>
            </div>
          </div>

          <div className="chatbot-body">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.isUser ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-content">{message.text}</div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot-message">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              placeholder={
                language === "marathi" 
                  ? "तुमचा संदेश टाइप करा..." 
                  : "Type your message..."
              }
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || inputMessage.trim() === ""}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;