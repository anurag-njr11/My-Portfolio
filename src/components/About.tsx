import React from 'react';
import Section from './Section';
import { motion } from 'motion/react';
import { User, Cpu, Code, Globe, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-8 bg-gradient-to-r from-primary-neon to-primary-purple rounded-2xl opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
          <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border-white/5 bg-black/40 hover:border-primary-neon/10 transition-all duration-500">
            <Sparkles className="absolute top-4 right-4 text-primary-neon opacity-20" size={32} />
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80 font-light">
              B.Tech student in Digital Transformation at Atria University with hands-on experience in 
              <span className="text-primary-neon font-medium"> machine learning</span>, 
              <span className="text-primary-purple font-medium"> AI-integrated systems</span>, and 
              <span className="text-primary-cyan font-medium"> full-stack development</span>.
            </p>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-white/60 leading-relaxed">
              Passionate about building intelligent, scalable, and impactful technology solutions 
              combining AI, software engineering, and sustainability-focused innovation.
            </p>
            
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-neon/10 rounded-lg text-primary-neon">
                  <Cpu size={20} />
                </div>
                <span className="text-sm font-medium text-white/80">AI Specialist</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-purple/10 rounded-lg text-primary-purple">
                  <Code size={20} />
                </div>
                <span className="text-sm font-medium text-white/80">Full Stack</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-white">Innovation with Purpose</h3>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed lg:text-lg">
            My journey is driven by the intersection of computational intelligence and real-world impact. 
            I believe technology should not just be efficient, but also regenerative and human-centric.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-card p-6 rounded-xl border-white/5 hover:border-primary-neon/30 transition-colors group">
              <h4 className="text-2xl font-bold text-gradient mb-2">12+</h4>
              <p className="text-xs text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">Projects Built</p>
            </div>
            <div className="glass-card p-6 rounded-xl border-white/5 hover:border-primary-purple/30 transition-colors group">
              <h4 className="text-2xl font-bold text-white mb-2">99%</h4>
              <p className="text-xs text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">ML Accuracy</p>
            </div>
            <div className="glass-card p-6 rounded-xl border-white/5 hover:border-primary-cyan/30 transition-colors group">
              <h4 className="text-2xl font-bold text-white mb-2">Sustainable</h4>
              <p className="text-xs text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">Mindset</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
