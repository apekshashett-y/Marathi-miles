// components/AIChatSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import './AIChatSection.css';

const AIChatSection = ({ selectedEvent, selectedYear, currentEra }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');

    // Add user message
    const newMessages = [
      ...messages,
      { role: 'user', text: userMsg }
    ];
    setMessages(newMessages);
    setIsChatting(true);

    try {
      const response = await fetch('http://localhost:8080/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: userMsg,
          eventContext: {
            title: selectedEvent.title,
            year: selectedYear,
            location: selectedEvent.location,
            category: selectedEvent.category,
            description: selectedEvent.fullDescription,
            era: currentEra
          },
          conversationHistory: messages
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages([
          ...newMessages,
          { role: 'assistant', text: data.response }
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', text: 'Connection error. Please check your internet and try again.' }
      ]);
    } finally {
      setIsChatting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What was the significance of this event?",
    "Who were the key people involved?",
    "What happened after this event?",
    "How did this impact Maharashtra's history?",
    "Are there any interesting stories about this?",
    "What was happening in India at that time?"
  ];

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    // Auto-send after a short delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="ai-chat-container">
      {/* Chat Header */}
      <div 
        className="ai-chat-header"
        onClick={() => setShowChat(!showChat)}
      >
        <div className="header-content">
          <span className="chat-icon">💬</span>
          <div>
            <h3 className="chat-title">Ask AI About This Event</h3>
            <p className="chat-subtitle">Get answers to your questions</p>
          </div>
        </div>
        <span className="collapse-icon">
          {showChat ? '▼' : '▶'}
        </span>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="chat-interface">
          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="suggested-questions">
              <p className="suggestions-label">Suggested Questions:</p>
              <div className="questions-grid">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="question-btn"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <span className="empty-icon">🤖</span>
                <p>Start asking questions about this historical event!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-wrapper ${msg.role}`}
                >
                  <div className={`message-bubble ${msg.role}`}>
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {isChatting && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                AI is thinking...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything about this event..."
              disabled={isChatting}
              className="chat-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={isChatting || !inputMessage.trim()}
              className="send-button"
            >
              {isChatting ? '...' : 'Send'}
            </button>
          </div>

          <p className="chat-footer">
            💡 Powered by Gemini AI • Press Enter to send
          </p>
        </div>
      )}
    </div>
  );
};

export default AIChatSection;