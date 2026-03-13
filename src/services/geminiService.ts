import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    console.error("Gemini API Key is missing or invalid. Please check your environment variables.");
    return null;
  }
  return key;
};

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key not configured");
  }

  const ai = new GoogleGenAI({ apiKey });

  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are Aura, an AI assistant for a portfolio website. 
      You represent the developer (a creative technologist specializing in AI and Web).
      Be professional, concise, and slightly futuristic in your tone.
      Answer questions about the developer's skills (React, TypeScript, AI/ML), projects (Neural Vision, Aura Chat), and experience.
      If you don't know something, be honest but helpful.`,
    },
    history: history,
  });

  const result = await chat.sendMessage({ message });
  return result.text;
}
