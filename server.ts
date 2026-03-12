import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, SKILLS } from "./src/constants";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Logging middleware to debug requests
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  const SYSTEM_PROMPT = `Tu es l'assistant IA du portfolio de Roua Bouhouch. 
  Roua est une ingénieure IA et développeuse Full-Stack basée à Lyon.
  Elle est actuellement en Master IA à l'Université Lyon 1.
  
  Tes objectifs :
  - Répondre aux questions sur son parcours, ses compétences et ses projets.
  - Être professionnel, concis et chaleureux.
  - Répondre dans la langue de l'utilisateur (Français ou Anglais).
  
  Informations sur les projets :
  ${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}
  
  Compétences :
  ${SKILLS.map(s => `- ${s.name} (${s.category})`).join('\n')}`;

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "undefined") {
        return res.status(500).json({ error: "La clé API Gemini n'est pas configurée sur le serveur." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
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
      res.status(500).json({ error: "Erreur de communication avec l'IA." });
    }
  });

  // Vite middleware for development
  const isProd = process.env.NODE_ENV === "production";
  
  if (!isProd) {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: "spa",
      base: '/',
    });
    app.use(vite.middlewares);
    console.log("Vite middleware loaded in development mode");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files from dist in production mode");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
