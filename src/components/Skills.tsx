import React, { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Layers, Globe, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const skillCategories = [
  {
    id: "ml",
    title: "Machine Learning",
    icon: <Brain size={18} />,
    colorClass: "from-blue-500 to-blue-400",
    skills: [
      { name: "Python", level: 95 },
      { name: "Scikit-learn", level: 90 },
      { name: "Pandas/NumPy", level: 92 },
      { name: "Matplotlib/Seaborn", level: 85 },
      { name: "Ensemble Learning", level: 88 },
      { name: "Feature Engineering", level: 90 },
      { name: "SMOTE", level: 85 },
      { name: "Classification/Regression", level: 94 },
    ]
  },
  {
    id: "ai",
    title: "AI Systems",
    icon: <Layers size={18} />,
    colorClass: "from-purple-500 to-purple-400",
    skills: [
      { name: "Gemini API", level: 92 },
      { name: "AI Chatbots", level: 88 },
      { name: "AI Summarization", level: 85 },
      { name: "Intelligent Workflows", level: 80 },
    ]
  },
  {
    id: "fs",
    title: "Full-Stack",
    icon: <Globe size={18} />,
    colorClass: "from-cyan-500 to-cyan-400",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "REST APIs", level: 92 },
      { name: "JWT Auth", level: 88 },
    ]
  },
  {
    id: "tools",
    title: "Tools",
    icon: <Terminal size={18} />,
    colorClass: "from-gray-400 to-gray-600",
    skills: [
      { name: "Git", level: 90 },
      { name: "Postman", level: 85 },
      { name: "Power BI", level: 80 },
      { name: "Excel", level: 95 },
      { name: "SQLite", level: 82 },
    ]
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const activeCategory = skillCategories.find(c => c.id === activeTab)!;

  return (
    <Section id="skills" title="Technical Expertise">
      <div className="max-w-6xl mx-auto w-full">
        {/* Tabs Manager */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12 p-2 glass-card rounded-xl md:rounded-2xl border-white/5">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "relative px-3 sm:px-6 py-2 sm:py-3 rounded-lg md:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 touch-manipulation",
                activeTab === category.id ? "text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg md:rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={cn("relative z-10 flex-shrink-0", activeTab === category.id && "text-blue-400")}>
                {React.cloneElement(category.icon as React.ReactElement, { size: 16 })}
              </span>
              <span className="relative z-10 hidden sm:inline">{category.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="relative min-h-[300px] sm:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border-white/5 relative overflow-hidden"
            >
              {/* Category-specific background glow */}
              <div className={cn(
                "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 bg-gradient-to-br",
                activeCategory.colorClass.replace('from-', 'from-').replace('to-', 'to-')
              )} />

              <div className="flex items-center space-x-3 sm:space-x-4 mb-8 sm:mb-10">
                <div className="p-2 sm:p-3 bg-white/5 rounded-lg md:rounded-2xl text-blue-400 flex-shrink-0">
                  {React.cloneElement(activeCategory.icon as React.ReactElement, { size: 20 })}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white">{activeCategory.title}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {activeCategory.skills.map((skill, sIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + (sIdx * 0.03) }}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl flex items-center justify-between group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-default touch-manipulation"
                >
                  <span className="text-xs sm:text-sm font-mono text-white/70 uppercase tracking-wider group-hover:text-blue-400 truncate">{skill.name}</span>
                  <div className="w-1 h-1 rounded-full bg-blue-500/30 group-hover:bg-blue-500 group-hover:shadow-[0_0_8px_#3b82f6] ml-2 flex-shrink-0" />
                </motion.div>
              ))}
            </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
