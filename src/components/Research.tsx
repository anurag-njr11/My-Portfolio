import React from 'react';
import Section from './Section';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Quote, Layers } from 'lucide-react';

export default function Research() {
  return (
    <Section id="research" title="Research & Insights">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass-card p-10 rounded-3xl relative border-primary-purple/20 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <BookOpen size={120} />
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-primary-purple/10 rounded-2xl text-primary-purple">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-display font-medium text-white">Title of Publication</h3>
                <p className="text-primary-purple font-mono text-sm tracking-widest">RESEARCH PAPER 2024</p>
              </div>
            </div>
            <div className="px-4 py-1 rounded-full border border-white/10 text-xs font-mono text-white/40 uppercase">
              Academic Excellence
            </div>
          </div>

          <h4 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
            “Rebuilding Critical Thinking <br />
            <span className="text-gradient">in the AI Era”</span>
          </h4>
          <p className="text-white/40 mb-8 text-sm italic font-mono uppercase tracking-[0.2em]">A University Learning Framework</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="flex items-center text-sm font-bold text-blue-400/60 uppercase tracking-widest">
                <Layers size={14} className="mr-2" /> Framework Proposal
              </h5>
              <ul className="space-y-3 text-white/50 text-base">
                <li className="flex items-start">
                   <div className="w-1 h-1 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                   AI as "Cognitive Infrastructure"
                </li>
                <li className="flex items-start">
                   <div className="w-1 h-1 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                   Structured Days: AI-Restricted vs AI-Open
                </li>
                <li className="flex items-start">
                   <div className="w-1 h-1 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                   Adaptive Assignments with real-time feedback
                </li>
                <li className="flex items-start">
                   <div className="w-1 h-1 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                   Oral & Process-based assessment focus
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative">
              <Quote className="absolute -top-3 -left-3 text-blue-400 opacity-40 shrink-0" size={32} />
              <p className="text-white/70 italic leading-relaxed">
                The objective is to ensure technology enhances learning without reducing students’ involvement in 
                understanding and applying ideas—keeping humans responsible for reasoning.
              </p>
            </div>
          </div>

          <div className="mt-10 flex border-t border-white/10 pt-8">
             <a 
               href="https://docs.google.com/document/d/1yG4JWqiKyx7TKkBSFKAjks26hjvblcTMFr4OrkZF1Rg/edit?usp=sharing" 
               target="_blank"
               rel="noreferrer"
               className="text-sm font-mono text-blue-400 hover:text-white transition-colors flex items-center"
             >
               READ FULL PUBLICATION <BookOpen size={16} className="ml-2" />
             </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
