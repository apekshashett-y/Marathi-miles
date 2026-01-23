// ai.controller.js - Using Official Google SDK (More Reliable)

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate initial explanation
const generateExplanation = async (event) => {
  try {
    console.log("🤖 Calling Gemini AI for explanation...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are a knowledgeable historian specializing in Maharashtra's history. Explain the historical significance of ${event.title} (${event.year}) in Maharashtra, India. 

Include:
- Historical context and background
- Cultural and political impact
- Legacy and importance today

Write in simple, engaging language suitable for students and history enthusiasts. Keep it concise (150-200 words).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini Response received ✅");
    return text;

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    
    // Fallback explanation
    return `${event.title} (${event.year}) was a significant event in Maharashtra's history that took place in ${event.location}. This ${event.category.toLowerCase()} event played an important role in shaping the region's cultural and political landscape.`;
  }
};

// Chat with AI about the event
const chatWithAI = async (userMessage, eventContext, conversationHistory = []) => {
  try {
    console.log("💬 Processing chat message:", userMessage.substring(0, 50) + "...");

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Build conversation context
    const systemContext = `You are an expert historian specializing in Maharashtra's history. You are currently discussing: ${eventContext.title} (${eventContext.year}).

Event Details:
- Location: ${eventContext.location}
- Category: ${eventContext.category}
- Era: ${eventContext.era}
- Description: ${eventContext.description}

Answer the user's questions about this event in a friendly, informative way. Keep responses concise (2-4 sentences) unless the user asks for more detail.`;

    // Start chat with history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemContext }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm ready to answer questions about this historical event from Maharashtra's rich history." }],
        },
        // Add conversation history
        ...conversationHistory.slice(-6).map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    console.log("Chat response received ✅");
    
    return {
      success: true,
      response: text
    };

  } catch (error) {
    console.error("❌ Chat Error:", error.message);
    return {
      success: false,
      response: "I apologize, but I'm having trouble processing your question right now. Could you please try rephrasing it?"
    };
  }
};

// Existing endpoint
export const explainEvent = async (req, res) => {
  try {
    console.log("📦 Explain event request received");
    const { event } = req.body;

    if (!event || !event.title) {
      return res.status(400).json({ 
        success: false,
        error: "Event data required" 
      });
    }

    const explanation = await generateExplanation(event);

    res.json({
      success: true,
      explanation,
      event: event.title
    });

  } catch (error) {
    console.error("❌ Controller Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate explanation",
      details: error.message
    });
  }
};

// Chat endpoint
export const chatAboutEvent = async (req, res) => {
  try {
    console.log("📦 Chat request received");
    const { userMessage, eventContext, conversationHistory } = req.body;

    if (!userMessage || !eventContext) {
      return res.status(400).json({ 
        success: false,
        error: "User message and event context required" 
      });
    }

    const chatResponse = await chatWithAI(
      userMessage, 
      eventContext, 
      conversationHistory || []
    );

    res.json(chatResponse);

  } catch (error) {
    console.error("❌ Chat Controller Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process chat message",
      details: error.message
    });
  }
};