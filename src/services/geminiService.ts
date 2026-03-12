import { GoogleGenAI } from "@google/genai";
import { PROJECTS, SKILLS } from "../constants";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey });

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
  if (!apiKey) {
    return "L'assistant IA est en attente de configuration (Clé API).";
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
