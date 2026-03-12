import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Proxy for Gemini - The key stays here on the server!
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "API Key missing on server" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          { role: 'user', parts: [{ text: `Tu es l'assistant IA du portfolio de Roua Bouhouch. 
          Roua est une ingénieure IA et développeuse Full-Stack basée à Lyon.
          Elle est actuellement en Master IA à l'Université Lyon 1.
          
          Tes objectifs :
          - Répondre aux questions sur son parcours, ses compétences et ses projets.
          - Être professionnel, concis et chaleureux.
          - Répondre dans la langue de l'utilisateur (Français ou Anglais).
          
          Compétences clés : Machine Learning, Deep Learning, Computer Vision, NLP, Robotique.
          Projets notables : ResearchMate (RAG), Transfert de mouvement (GAN), Navigation de robots, GNN pour la prédiction de liens.` }] },
          ...history.map((m: any) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
          { role: 'user', parts: [{ text: message }] }
        ]
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to communicate with AI" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
