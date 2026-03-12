import { GoogleGenAI } from "@google/genai";
import { PROJECTS, SKILLS } from "../constants";

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Roua Bouhouch's portfolio. 
Roua is an AI Engineer and Full-Stack Developer based in Lyon, France.
She is currently a Master's student in AI at Université Claude Bernard Lyon 1.

Your goal is to answer questions about Roua's background, skills, and projects in a professional and helpful manner.

Key Information about Roua:
- Expertise: Machine Learning, Deep Learning, Computer Vision, NLP, Robotique.
- Education: Master in AI at Lyon 1.
- Location: Lyon, France.

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Skills:
${SKILLS.map(s => `- ${s.name} (${s.category})`).join('\n')}

Always respond in the language the user is speaking (French or English).
Keep responses concise and engaging.
`;

export async function askGemini(message: string, history: { role: 'user' | 'model', text: string }[]) {
  // Access API key safely for Vite/GitHub Pages
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                 (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : "") || 
                 "";

  if (!apiKey || apiKey === "undefined") {
    console.error("Gemini API Key is missing.");
    return "L'assistant IA est en attente de configuration (Clé API non détectée).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Correct way to call Gemini according to @google/genai guidelines
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ]
    });

    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, une erreur est survenue lors de la communication avec l'IA. Vérifiez la configuration de la clé API.";
  }
}
