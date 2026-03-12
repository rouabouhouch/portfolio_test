import { GoogleGenAI } from "@google/genai";
import { PROJECTS, SKILLS } from "../constants";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey });

// ... (SYSTEM_INSTRUCTION remains the same)

export async function askGemini(message: string, history: { role: 'user' | 'model', text: string }[]) {
  if (!apiKey || apiKey === "undefined") {
    return "L'assistant IA est en attente de configuration (Clé API non détectée).";
  }

  try {
    const model = genAI.models.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, une erreur est survenue. Vérifiez la configuration de la clé API.";
  }
}
