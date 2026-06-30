import React from 'react';
import Section from './Section';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Send, MapPin, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/anurag-singh-a67498307/',
    icon: <Linkedin size={24} />,
    color: 'hover:text-[#0077b5]',
    handle: '@anurag-singh'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/anurag-njr11',
    icon: <Github size={24} />,
    color: 'hover:text-[#fafafa]',
    handle: '@anurag-njr11'
  },
  {
    name: 'Email',
    url: 'mailto:anurag18092006@gmail.com',
    icon: <Mail size={24} />,
    color: 'hover:text-primary-neon',
    handle: 'anurag18092006@gmail.com'
  }
];

export default function Contact() {
  return (
    <Section id="contact" title="Get In Touch" className="pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border-primary-neon/20 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6">Let's build the <span className="text-gradient">future together.</span></h3>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-8 sm:mb-10">
              I'm always open to discussing innovative projects, AI solutions, or academic collaborations. 
              Whether you have a question or just want to say hi, my inbox is open.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center justify-between p-4 sm:p-6 glass-card rounded-xl md:rounded-2xl border-white/5 ${link.color} transition-all`}
              >
                <div className="flex items-center space-x-3 sm:space-x-6">
                  <div className="p-2 sm:p-3 bg-white/5 rounded-lg md:rounded-xl group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-1">{link.name}</h4>
                    <span className="text-sm sm:text-lg font-medium text-white/80">{link.handle}</span>
                  </div>
                </div>
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="space-y-6 sm:space-y-8"
        >
          <div className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl border-white/5">
             <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Name</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 sm:px-5 py-2 sm:py-4 text-sm focus:outline-none focus:border-primary-neon/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Email</label>
                    <input type="email" placeholder="you@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 sm:px-5 py-2 sm:py-4 text-sm focus:outline-none focus:border-primary-neon/50 transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                   <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Subject</label>
                   <input type="text" placeholder="Project Inquiry" className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 sm:px-5 py-2 sm:py-4 text-sm focus:outline-none focus:border-primary-neon/50 transition-colors" />
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-mono uppercase tracking-widest text-white/40 ml-1">Message</label>
                   <textarea rows={4} placeholder="Tell me about your vision..." className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-4 sm:px-5 py-2 sm:py-4 text-sm focus:outline-none focus:border-primary-neon/50 transition-colors resize-none"></textarea>
                </div>

                <button className="w-full py-4 sm:py-5 bg-white text-black font-bold rounded-lg md:rounded-xl flex items-center justify-center space-x-2 hover:bg-white/90 transition-colors group text-sm sm:text-base">
                   <span>Send Transmission</span>
                   <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
             </form>
          </div>

          <div className="flex items-center space-x-4 p-6 sm:p-8 glass-card rounded-2xl md:rounded-3xl border-white/5">
             <div className="p-3 sm:p-4 bg-primary-neon/10 rounded-xl md:rounded-2xl text-primary-neon flex-shrink-0">
               <MapPin size={20} />
             </div>
             <div className="min-w-0">
               <h4 className="text-white font-bold text-sm sm:text-lg">Location</h4>
               <p className="text-white/40 text-xs sm:text-base">Bangalore, India · UTC+5:30</p>
             </div>
          </div>
        </motion.div>
      </div>

      <footer className="border-t border-white/10 py-12 text-center">
        <h2 className="text-3xl font-display font-bold text-gradient mb-4">ANURAG SINGH</h2>
        <p className="text-white/40 text-sm mb-12">Building intelligent systems for a sustainable tomorrow.</p>
        
        <div className="flex justify-center space-x-8 mb-12">
          {socialLinks.map(l => (
            <a key={l.name} href={l.url} className="text-white/40 hover:text-white transition-colors">{l.name}</a>
          ))}
        </div>

        <div className="text-[10px] uppercase tracking-[0.4em] text-white/20">
          © 2024 ANURAG SINGH · DESIGNED WITH AI INTELLIGENCE
        </div>
      </footer>
    </Section>
  );
}
