import React, { useState, useEffect } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LabelList, Legend } from 'recharts';
import { ExternalLink, Github, MessageSquare, Database, Shield, Zap, Sparkles, Cat, ArrowRight, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const cyberData = [
  { subject: 'Normal', value: 99, fullMark: 100 },
  { subject: 'DoS', value: 100, fullMark: 100 },
  { subject: 'Probe', value: 99, fullMark: 100 },
  { subject: 'R2L', value: 91, fullMark: 100 },
  { subject: 'U2R', value: 64, fullMark: 100 },
];

const severityData = [
  { name: 'Decision Tree', score: 0.982 },
  { name: 'SVR (RBF)', score: 0.978 },
  { name: 'KNN (k=5)', score: 0.945 },
  { name: 'Linear Reg', score: 0.496 },
];

const smoteImpactData = [
  { name: 'Recall', Before: 35, After: 47 },
  { name: 'F1-Score', Before: 52, After: 64 },
  { name: 'Precision', Before: 100, After: 100 },
];

const Typewriter = ({ text, delay, startDelay = 0 }: { text: string, delay: number, startDelay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay, started]);

  return <span>{displayText}</span>;
};

export default function Projects() {
  const [activeChat, setActiveChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Meow! I'm your AI genomic assistant. How can I help you explore DNA sequences today?", isBot: true }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as any).elements.message;
    if (!input.value) return;
    
    setMessages(prev => [...prev, { text: input.value, isBot: false }]);
    input.value = '';

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I've analyzed that sequence. The G-C content is remarkably high! Would you like a summary?", isBot: true }]);
    }, 1000);
  };

  return (
    <Section id="projects" title="Interstellar Projects">
      <div className="space-y-32">
        {/* Project 1: Cybersecurity ML Pipeline */}
        <div className="space-y-12">
          {/* Main Info Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="text-primary-neon" />
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">Cybersecurity Evolution</span>
              </div>
              <h3 className="text-4xl font-display font-bold mb-6">Intrusion Detection + <span className="text-primary-neon">Severity Prediction</span></h3>
              <p className="text-white/60 leading-relaxed mb-8">
                A two-stage ML pipeline that mimics a real SIEM System in a SOC. 
                Stage 1 classifies network traffic as normal or attack using <span className="text-white">KDD99</span>, 
                while Stage 2 predicts <span className="text-white">CVSS severity scores</span> (0-10) using regression.
              </p>
              
              <ul className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Database size={16} />, text: 'R² ≈ 0.982' },
                  { icon: <Zap size={16} />, text: 'Best: Decision Tree' },
                  { icon: <Shield size={16} />, text: 'SMOTE Sampling' },
                  { icon: <Zap size={16} />, text: 'Near-Perfect F1' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-white/80">
                    <span className="text-primary-neon">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center space-x-4">
                <a href="https://github.com/anurag-njr11/Intrusion-Detection-ML-model" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-6 py-2 glass-card rounded-full hover:bg-white/10 transition-colors">
                  <Github size={16} className="text-primary-neon" />
                  <span>Case Study</span> <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>

            {/* Premium Pipeline Overview Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-3xl bg-black/40 border-primary-neon/10 hover:border-primary-neon/20 transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-neon/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center space-x-2 text-primary-neon">
                  <Terminal size={14} />
                  <h5 className="text-[10px] font-black uppercase tracking-widest leading-none">SYS_PIPELINE</h5>
                </div>
                <div className="text-[8px] font-mono p-1 bg-primary-neon/10 text-primary-neon rounded border border-primary-neon/20 animate-pulse">MONITOR_ACTIVE</div>
              </div>

              {/* Step Flowchart Visualization */}
              <div className="space-y-4">
                <div className="p-4 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-xl relative transition-all duration-300">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary-neon/5 border border-primary-neon/30 rounded-full flex items-center justify-center text-[8px] font-bold text-primary-neon font-mono">1</div>
                  <div className="ml-4">
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">DATA INTEGRATION & SMOTE</div>
                    <p className="text-[10px] text-white/50 leading-relaxed uppercase">Oversampled rare U2R category from 35 to 330,000+ synthetic samples</p>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-xl relative transition-all duration-300">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500/5 border border-blue-500/30 rounded-full flex items-center justify-center text-[8px] font-bold text-blue-400 font-mono">2</div>
                  <div className="ml-4">
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">CLASSIFICATION LAYER</div>
                    <p className="text-[10px] text-white/50 leading-relaxed uppercase">High-precision normal vs. anomaly categorization using Decision Trees & KNN</p>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-xl relative transition-all duration-300">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-50/5 border border-purple-500/30 rounded-full flex items-center justify-center text-[8px] font-bold text-purple-400 font-mono">3</div>
                  <div className="ml-4">
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">CVSS REGRESSION MODEL</div>
                    <p className="text-[10px] text-white/50 leading-relaxed uppercase">Real-time prediction of CVSS vulnerability score with R² up to 0.982</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive ML Performance Charts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Chart 1: F1-Score per Attack Category */}
            <div className="glass-card p-6 rounded-3xl bg-black/50 border-primary-neon/10 hover:border-primary-neon/20 flex flex-col justify-between shadow-xl transition-all duration-500">
               <h4 className="text-center font-mono text-[10px] mb-4 text-white/40 uppercase tracking-widest leading-none">F1-Score per Attack Category</h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={cyberData}>
                    <PolarGrid stroke="#ffffff08" />
                    <PolarAngleAxis dataKey="subject" stroke="#ffffff40" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#3b82f620" fontSize={8} />
                    <Radar
                      name="F1-Score"
                      dataKey="value"
                      stroke="#3b82f6aa"
                      fill="#3b82f655"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                 <p className="text-[9px] font-mono text-white/40 leading-relaxed uppercase">
                   Accurate attack detection with high-density precision indicators
                 </p>
              </div>
            </div>

            {/* Chart 2: Model Benchmark */}
            <div className="glass-card p-6 rounded-3xl bg-black/50 border-primary-neon/10 hover:border-primary-neon/20 flex flex-col justify-between shadow-xl transition-all duration-500">
               <h4 className="text-center font-mono text-[10px] mb-4 text-white/40 uppercase tracking-widest leading-none">Model Benchmark (R² Score)</h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={severityData} layout="vertical" margin={{ left: 50, right: 20 }}>
                    <XAxis type="number" domain={[0, 1]} hide />
                    <YAxis dataKey="name" type="category" stroke="#ffffff40" fontSize={10} width={80} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {severityData.map((_, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={['#10b981bb', '#3b82f6bb', '#8b5cf6bb', '#d946efbb'][index % 4]} 
                        />
                      ))}
                      <LabelList dataKey="score" position="right" fill="#ffffff60" fontSize={10} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                 <span className="text-[8px] font-mono p-1 bg-white/[0.01] text-white/40 rounded border border-white/5 uppercase tracking-tighter">Impact Integrity: 47.9%</span>
                 <span className="text-[8px] font-mono p-1 bg-white/[0.01] text-white/40 rounded border border-white/5 uppercase tracking-tighter">Impact Avail: 19.8%</span>
              </div>
            </div>

            {/* Chart 3: Class Imbalance (SMOTE) */}
            <div className="glass-card p-6 rounded-3xl bg-black/50 border-primary-neon/10 hover:border-primary-neon/20 flex flex-col justify-between shadow-xl transition-all duration-500">
               <h4 className="text-center font-mono text-[10px] mb-4 text-white/40 uppercase tracking-widest leading-none">Class Imbalance Handling (SMOTE Impact on U2R)</h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={smoteImpactData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#ffffff40" fontSize={10} width={25} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      iconType="circle" 
                      wrapperStyle={{ fontSize: '10px', color: '#fff' }}
                    />
                    <Bar dataKey="Before" fill="#ef4444aa" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="Before" position="top" fill="#ffffff40" fontSize={8} formatter={(val: number) => `${val}%`} />
                    </Bar>
                    <Bar dataKey="After" fill="#10b981aa" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="After" position="top" fill="#ffffff50" fontSize={8} formatter={(val: number) => `${val}%`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                 <p className="text-[9px] font-mono text-white/40 leading-relaxed uppercase">
                   Oversampled rare U2R category from 35 to 330,000+ synthetic samples
                 </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project 2: Symbio-NLM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Sparkles className="text-primary-purple" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">Bioinformatics AI Evolution</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-black leading-tight text-gradient">
              SYMBIO-NLM: <br />
              <span className="text-white">GENOMIC ANALYTICS</span>
            </h3>
            <p className="text-white/60 leading-relaxed text-lg">
              A full-stack educational genomics platform designed to validate, parse, and interpret 
              <span className="text-white font-medium"> DNA FASTA sequences</span> using AI-driven structured biological metadata.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-5 rounded-2xl border-purple-500/20 bg-purple-500/5">
                <h5 className="text-purple-400 font-bold mb-2 flex items-center"><Zap size={16} className="mr-2" /> Pipeline</h5>
                <ul className="text-xs space-y-2 text-white/40 font-mono">
                  <li>// FASTA Validation</li>
                  <li>// GC% Extraction</li>
                  <li>// ORF Detection</li>
                  <li>// PDF Report Generation</li>
                </ul>
              </div>
              <div className="glass-card p-5 rounded-2xl border-blue-500/20 bg-blue-500/5">
                <h5 className="text-blue-400 font-bold mb-2 flex items-center"><Database size={16} className="mr-2" /> Stack</h5>
                <ul className="text-xs space-y-2 text-white/40 font-mono">
                  <li>// Node.js/Express</li>
                  <li>// MongoDB/Mongoose</li>
                  <li>// GSAP/Recharts</li>
                  <li>// Gemini AI 2.5 Flash</li>
                </ul>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <p className="text-sm text-white/60 leading-relaxed italic">
                "The platform replicates a simplified workflow of real-world bioinformatics pipelines, demonstrating end-to-end capability in AI-enhanced biological interpretation."
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <a href="https://github.com/anurag-njr11/Symbio-project" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-primary-purple/20 border border-primary-purple/40 text-primary-purple rounded-full hover:bg-primary-purple/30 transition-all group">
                <Github size={20} />
                <span className="font-bold text-sm uppercase tracking-widest">View Source Code</span> 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:order-2"
          >
            <div className="glass-card rounded-3xl p-6 bg-neutral-950/80 backdrop-blur-2xl border-primary-purple/30 min-h-[500px] flex flex-col text-white shadow-2xl shadow-primary-purple/20">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center space-x-2 text-primary-purple">
                  <Zap size={14} fill="currentColor" />
                  <h5 className="text-[10px] font-black uppercase tracking-widest leading-none">Genomic Analysis Engine</h5>
                </div>
                <div className="text-[8px] font-mono p-1 bg-primary-purple/20 text-primary-neon rounded border border-primary-neon/20 animate-pulse">Analysis Active</div>
              </div>

              {/* Dynamic Demo Simulation */}
              <div className="space-y-6 flex-1">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Length", val: "171 bp", color: "text-blue-400" },
                    { label: "GC%", val: "53.21%", color: "text-green-400" },
                    { label: "ORF", val: "Positive", color: "text-purple-400" },
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="bg-white/10 p-3 rounded-xl border border-white/10"
                    >
                      <div className="text-[8px] uppercase tracking-tighter text-white/40 mb-1">{stat.label}</div>
                      <div className={cn("text-xs font-bold font-mono", stat.color)}>{stat.val}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Analysis & Chart Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                      <div className="text-[9px] font-bold text-white/30 uppercase mb-3 flex items-center">
                        <MessageSquare size={10} className="mr-1" /> Interpretation
                      </div>
                      <div className="text-[10px] leading-relaxed font-medium text-white/70 h-32 overflow-hidden">
                        <Typewriter text="The analyzed sequence test_sequence.fasta contains 171 base pairs with 53.216374269005854% GC content. The presence of an Open Reading Frame (ORF) suggests potential protein-coding capability." delay={40} />
                      </div>
                   </div>
                   <div className="bg-white/10 p-4 rounded-xl border border-white/20 overflow-hidden">
                      <div className="text-[9px] font-bold text-white/30 uppercase mb-3 text-center">Base Distribution</div>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={[
                              { n: 'A', v: 24.0, c: '#ef4444' },
                              { n: 'T', v: 22.8, c: '#fbbf24' },
                              { n: 'G', v: 30.4, c: '#22c55e' },
                              { n: 'C', v: 22.8, c: '#3b82f6' },
                            ]}
                            margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
                          >
                            <XAxis 
                              dataKey="n" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: '#ffffff60', fontSize: 10, fontWeight: 'bold' }} 
                            />
                            <YAxis hide />
                            <Tooltip content={() => null} />
                            <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                              <LabelList 
                                dataKey="v" 
                                position="top" 
                                fill="#ffffff80" 
                                fontSize={8} 
                                formatter={(val: number) => `${val}%`} 
                              />
                              {[0, 1, 2, 3].map((_, index) => (
                                <Cell key={`cell-${index}`} fill={['#ef4444', '#fbbf24', '#22c55e', '#3b82f6'][index]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                   </div>
                </div>

                {/* AI Box */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="p-5 rounded-xl bg-primary-purple/5 border border-primary-purple/20 relative"
                >
                   <div className="absolute top-2 right-3 text-[6px] font-mono text-primary-purple/40">SYSTEM://GEMINI_1.5_FLASH</div>
                   <div className="flex items-center space-x-2 mb-3 text-primary-purple">
                      <Sparkles size={12} />
                      <h6 className="text-[9px] font-black uppercase tracking-widest">AI Analysis</h6>
                   </div>
                   <p className="text-[10px] leading-relaxed text-white/50 italic">
                     <Typewriter text="The 53.22% GC content indicates a moderately stable DNA molecule, as the three hydrogen bonds between guanine and cytosine bases provide greater thermal stability compared to the two bonds in adenine-thymine pairs. The presence of a detected Open Reading Frame (ORF) strongly suggests that this sequence carries coding potential, implying it could be transcribed and translated into a functional protein." delay={30} startDelay={3000} />
                   </p>
                </motion.div>
              </div>

              {/* Cat Assistant bubble */}
              <motion.div 
                animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-neutral-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_20px_50px_rgba(168,85,247,0.3)] border border-white/20 flex items-center space-x-3 z-30 text-white"
              >
                 <div className="text-[10px] font-black tracking-tight leading-tight uppercase text-white/90">Project <br/> Complete</div>
                 <div className="w-10 h-10 rounded-full bg-primary-purple/30 flex items-center justify-center ring-4 ring-primary-purple/10">
                   <Cat size={20} className="text-primary-neon" />
                 </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
