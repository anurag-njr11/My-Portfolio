import React from 'react';
import Section from './Section';
import { motion } from 'motion/react';
import { Trophy, Medal, Flag, Award, Anchor, UserRound } from 'lucide-react';

const achievements = [
  {
    title: "India Sustainability Startathon",
    meta: "National Finalist",
    icon: <Trophy className="text-primary-neon" />,
    color: "from-primary-neon/20"
  },
  {
    title: "TiE U Business Pitch",
    meta: "Semi-finalist",
    icon: <Medal className="text-primary-purple" />,
    color: "from-primary-purple/20"
  },
  {
    title: "PJMT South Zonal",
    meta: "Qualifier",
    icon: <Award className="text-primary-cyan" />,
    color: "from-primary-cyan/20"
  }
];

const leadership = [
  {
    title: "University Football Captain",
    desc: "Led the university team to multiple inter-college victories.",
    icon: <Anchor className="text-white" />,
  },
  {
    title: "NCC B Certificate",
    desc: "Demonstrated discipline and commitment as a cadet.",
    icon: <Flag className="text-white" />,
  },
  {
    title: "National Taekwondo",
    desc: "Represented at the national level, showcasing grit and determination.",
    icon: <UserRound className="text-white" />,
  }
];

export default function Milestones() {
  return (
    <Section id="milestones" title="Excellence Beyond Code">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Achievements Column */}
        <div id="achievements">
          <div className="flex items-center space-x-3 mb-10">
            <Trophy className="text-primary-neon" size={28} />
            <h3 className="text-3xl font-display font-medium">Achievements</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {achievements.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-6 rounded-2xl flex items-center space-x-6 bg-gradient-to-r ${item.color} to-transparent border-white/5 hover:border-blue-500/30 group transition-all`}
              >
                <div className="p-4 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-white leading-tight mb-1">{item.title}</h4>
                  <p className="text-xs text-white/40 font-mono tracking-widest uppercase">{item.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership Column */}
        <div id="leadership">
          <div className="flex items-center space-x-3 mb-10">
            <UserRound className="text-primary-purple" size={28} />
            <h3 className="text-3xl font-display font-medium">Leadership</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {leadership.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl group border-white/5 hover:bg-white/5 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/5 rounded-lg group-hover:bg-primary-purple/20 group-hover:text-primary-purple transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
