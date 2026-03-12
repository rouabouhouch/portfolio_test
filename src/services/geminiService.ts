import { GoogleGenAI } from "@google/genai";
import { PROJECTS, SKILLS } from "../constants";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Roua Bouhouch's portfolio. 
Roua is an AI Engineer and Full-Stack Developer based in Lyon, France.
She is currently a Master's student in AI at Université Claude Bernard Lyon 1.

Your goal is to answer questions about Roua's background, skills, and projects in a professional and helpful manner.
If you don't know something, be honest but positive.

Key Information about Roua:
- Expertise: Machine Learning, Deep Learning, Computer Vision, NLP, Reinforcement Learning.
- Languages: Python, C++, Java, JavaScript, PHP, R.
- Education: Master in AI at Lyon 1.
- Location: Lyon, France.
- Seeking: Internships or work-study (alternance) opportunities in AI.

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Skills:
${SKILLS.map(s => `- ${s.name} (${s.category})`).join('\n')}

Always respond in the language the user is speaking (French or English).
Keep responses concise and engaging.
`;

export async function askGemini(message: string, history: { role: 'user' | 'model', text: string }[]) {
  if (!apiKey) {
    return "L'assistant IA est actuellement en maintenance (clé API manquante).";
  }

  try {
    const model = "gemini-3-flash-preview";
    const chat = genAI.chats.create({
      model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec l'IA.";
  }
}
