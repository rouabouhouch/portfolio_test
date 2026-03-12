/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Code2, 
  BrainCircuit, 
  Database, 
  Cpu, 
  Send, 
  MessageSquare, 
  X, 
  ChevronRight,
  Terminal,
  Sparkles,
  User,
  Layers,
  Briefcase
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PROJECTS, SKILLS } from './constants';
import { askGemini } from './services/geminiService';
import Markdown from 'react-markdown';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-black text-sm">RB</span>
          </div>
          <span className="hidden sm:inline">Roua Bouhouch</span>
        </motion.div>
        
        <div className="flex gap-8 text-sm font-medium">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white/60 hover:text-emerald-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6 border border-emerald-500/20">
            AI Engineer & Full-Stack Developer
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Building the <span className="text-gradient">Future</span> <br /> with Intelligence.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Étudiante en Master d'IA, passionnée par le développement de systèmes intelligents et l'optimisation de solutions innovantes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl transition-all flex items-center gap-2 group"
            >
              Voir mes projets
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 glass hover:bg-white/10 text-white font-semibold rounded-xl transition-all"
            >
              Me contacter
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/20 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-emerald-400" />
              <h2 className="text-3xl font-bold">À propos de moi</h2>
            </div>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed">
              <p>
                Étudiante en Master d'Intelligence Artificielle à l'Université Claude Bernard Lyon 1, je suis passionnée par le développement et l'optimisation de systèmes intelligents.
              </p>
              <p>
                Mon expertise couvre l'apprentissage automatique, le deep learning, l'apprentissage par renforcement et les réseaux de neurones graphiques. Forte d'une double compétence en développement logiciel et en IA, je conçois des solutions innovantes allant de la robotique autonome aux systèmes de recommandation intelligents.
              </p>
              <p>
                J'ai travaillé sur des projets de recherche appliquée au CRNL, optimisant des modèles d'IA pour l'analyse de données neurologiques. Je recherche activement des opportunités de stage et d'alternance.
              </p>
            </div>
            
            <div className="mt-10 flex gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">15+</span>
                <span className="text-sm text-white/40 uppercase tracking-wider">Projets Réalisés</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">Lyon</span>
                <span className="text-sm text-white/40 uppercase tracking-wider">Localisation</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass p-2">
              <img 
                src="https://picsum.photos/seed/ai-engineer/800/800" 
                alt="Roua Bouhouch" 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-white/40">Statut</p>
                  <p className="font-semibold">Disponible pour Stage/Alternance</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    { name: 'Intelligence Artificielle', icon: BrainCircuit, skills: SKILLS.filter(s => s.category === 'IA') },
    { name: 'Développement', icon: Code2, skills: SKILLS.filter(s => s.category === 'Dev') }
  ];

  return (
    <section id="skills" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-emerald-400" />
            <h2 className="text-3xl font-bold">Mes Compétences</h2>
          </div>
          <p className="text-white/40 max-w-xl mx-auto">
            Un aperçu de mes capacités techniques en IA et en développement logiciel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <cat.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">{cat.name}</h3>
              </div>
              
              <div className="space-y-6">
                {cat.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/40">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-emerald-400" />
              <h2 className="text-3xl font-bold">Projets Sélectionnés</h2>
            </div>
            <p className="text-white/40 max-w-xl">
              Découvrez une sélection de mes travaux récents en IA et développement.
            </p>
          </div>
          <a href="https://github.com/rouabouhouch" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 font-medium">
            Voir tout sur GitHub <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group glass p-6 rounded-3xl hover:bg-white/[0.08] transition-all duration-300 flex flex-col"
            >
              <div className="mb-6 aspect-video rounded-2xl overflow-hidden bg-white/5 relative">
                <img 
                  src={`https://picsum.photos/seed/${project.title}/600/400`} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-emerald-400 border border-emerald-500/30">
                  {project.category}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-white/50 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors p-2 glass rounded-lg"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass p-12 rounded-[40px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Travaillons <br /> <span className="text-gradient">Ensemble</span></h2>
              <p className="text-white/60 mb-12 text-lg">
                Je suis toujours ouverte à de nouvelles opportunités et collaborations passionnantes dans le domaine de l'IA.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:rouabouhouch777@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-white/40 group-hover:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest">Email</p>
                    <p className="font-medium">rouabouhouch777@gmail.com</p>
                  </div>
                </a>
                
                <a href="https://github.com/rouabouhouch" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Github className="w-5 h-5 text-white/40 group-hover:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest">GitHub</p>
                    <p className="font-medium">github.com/rouabouhouch</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest">Localisation</p>
                    <p className="font-medium">Lyon, France</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nom" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors" />
              </div>
              <input type="text" placeholder="Sujet" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors" />
              <textarea placeholder="Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none" />
              <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Bonjour ! Je suis l'assistant IA de Roua. Comment puis-je vous aider aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askGemini(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] glass rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-sm font-bold">Assistant IA</p>
                  <p className="text-[10px] text-emerald-400 uppercase tracking-widest">En ligne</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn(
                  "flex",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm",
                    msg.role === 'user' 
                      ? "bg-emerald-500 text-black font-medium rounded-tr-none" 
                      : "bg-white/10 text-white/90 rounded-tl-none"
                  )}>
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez une question..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group relative"
      >
        {isOpen ? <X className="w-6 h-6 text-black" /> : <MessageSquare className="w-6 h-6 text-black" />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-emerald-500/30">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      <footer className="py-12 border-t border-white/5 text-center text-white/20 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Roua Bouhouch. Tous droits réservés.</p>
          <p className="mt-2">Réalisé avec ❤️ et Intelligence Artificielle</p>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}
