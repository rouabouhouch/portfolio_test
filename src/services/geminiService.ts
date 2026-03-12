import { PROJECTS, SKILLS } from "../constants";

export async function askGemini(message: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur serveur");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return "Désolé, je ne peux pas répondre pour le moment. L'assistant est en cours de maintenance.";
  }
}
