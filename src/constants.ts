/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  category: 'AI' | 'Dev' | 'Research';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export const PROJECTS: Project[] = [
  {
    title: "ResearchMate - Assistant Intelligent de Documents",
    description: "Application intelligente permettant de charger des documents (PDF/TXT) et d'interagir avec eux via des requêtes en langage naturel. Combinaison de moteur RAG, embeddings vectoriels et LLM local.",
    tags: ["NLP", "LLM", "Python", "React"],
    link: "https://github.com/rouabouhouch/ResearchMate---Intelligent-Document-Assistant",
    category: "AI"
  },
  {
    title: "Transfert de mouvement et génération d’images de danse",
    description: "Génération d’animations de danse par transfert de mouvement basé sur la pose, combinant vision par ordinateur, réseaux neuronaux et GAN pour produire des images réalistes.",
    tags: ["Computer Vision", "Deep Learning", "PyTorch", "GAN"],
    link: "https://github.com/rouabouhouch/image.git",
    category: "AI"
  },
  {
    title: "Robots Autonomes & Navigation par Vision",
    description: "Développement de robots autonomes dotés d'une navigation basée sur la vision, communication TCP et contrôle de mouvement via Python. Système multi-agents coordonnés.",
    tags: ["Robotics", "Computer Vision", "Python", "TCP"],
    link: "https://github.com/Thomas-aub/Hungry_Hungry_Hippos_Robots/tree/image_analysis",
    category: "AI"
  },
  {
    title: "Framework de Raisonnement Argumentatif (ABA/ABA+)",
    description: "Conception d'un framework Python modulaire pour l'argumentation basée sur les hypothèses. Génération automatique d'arguments, calcul d'attaques et visualisation interactive.",
    tags: ["Symbolic AI", "Logic", "Python"],
    link: "https://github.com/rouabouhouch/Continuous-Assessment-Report-Reasoning-and-Argumentation-Frameworks-in-AI.git",
    category: "Research"
  },
  {
    title: "Système de Recommandation Musicale",
    description: "Moteur de recommandation par contenu utilisant clustering K-Means et similarité cosinus. Application interactive Streamlit avec API Spotify.",
    tags: ["Machine Learning", "Streamlit", "Spotify API"],
    link: "https://github.com/rouabouhouch/Sys-recommendation.git",
    category: "AI"
  },
  {
    title: "Projet GNN 2025 - Prédiction de Liens",
    description: "Auto-encodeur variationnel sur graphe (VGAE-GCN) pour la prédiction de liens dans un réseau aéroportuaire mondial. Performance : AUC ≈ 0.982.",
    tags: ["GNN", "Deep Learning", "PyTorch"],
    link: "https://github.com/rouabouhouch/gnn.git",
    category: "AI"
  },
  {
    title: "Classification d'Émotions (NLP)",
    description: "Classificateur de texte basé sur RNN avec pipeline NLP complet : tokenisation, vocabulaire, encodage one-hot et padding.",
    tags: ["NLP", "RNN", "Python"],
    link: "https://github.com/rouabouhouch/projetnlp.git",
    category: "AI"
  },
  {
    title: "Agents d'Apprentissage par Renforcement",
    description: "Agents RL pour CartPole et LunarLander : REINFORCE, DQN, exploration epsilon-greedy, replay buffer et réseaux cibles sous PyTorch.",
    tags: ["RL", "PyTorch", "DQN"],
    link: "https://github.com/M2IA-UCBL1/2025-m2ia-intagents-tp1-atraoui.git",
    category: "AI"
  },
  {
    title: "Simulation de RPG Tactique Distribué",
    description: "Moteur de jeu de rôle tactique simulant des agents autonomes. Implémentation de stratégies individuelles et collectives dans un environnement multi-agents.",
    tags: ["Java", "Distributed Systems", "Multi-Agents"],
    link: "https://forge.univ-lyon1.fr/p2314124/lifprojet",
    category: "Dev"
  },
  {
    title: "Monde Interactif 3D (SDF/GLSL)",
    description: "Création d'un univers immersif en 3D utilisant des fonctions de distance signées (SDF) et des shaders GLSL. Rendu temps réel avec animations.",
    tags: ["Graphics", "GLSL", "Shaders"],
    link: "https://www.shadertoy.com/view/DsKSWz",
    category: "Dev"
  },
  {
    title: "Jeu de Monopoly (C++)",
    description: "Version informatique complète du jeu Monopoly développée en C++ avec la bibliothèque SDL2. Architecture logicielle robuste.",
    tags: ["C++", "SDL2", "OOP"],
    link: "https://github.com/rouabouhouch/Monopoy",
    category: "Dev"
  },
  {
    title: "Sokoban (Java MVC)",
    description: "Implémentation du jeu Sokoban en Java suivant l'architecture MVC. Gestion avancée des niveaux et interface graphique.",
    tags: ["Java", "MVC", "Algorithms"],
    link: "https://forge.univ-lyon1.fr/p2001434/sokoban",
    category: "Dev"
  }
];

export const SKILLS: Skill[] = [
  { name: "Machine Learning", level: 90, category: "IA" },
  { name: "Deep Learning (PyTorch/TF)", level: 85, category: "IA" },
  { name: "Computer Vision", level: 80, category: "IA" },
  { name: "NLP", level: 75, category: "IA" },
  { name: "Reinforcement Learning", level: 70, category: "IA" },
  { name: "Python", level: 95, category: "Dev" },
  { name: "C++ / C#", level: 80, category: "Dev" },
  { name: "Java", level: 85, category: "Dev" },
  { name: "React / Web Full-Stack", level: 80, category: "Dev" },
  { name: "SQL / NoSQL", level: 75, category: "Dev" },
  { name: "Analyse de Données (Pandas/R)", level: 85, category: "Dev" }
];
