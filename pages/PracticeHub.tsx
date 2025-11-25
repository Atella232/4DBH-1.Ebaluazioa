
import React from 'react';
import { Translation } from '../types';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight, Wand2, Grid, BrainCircuit, Activity } from 'lucide-react';

interface Props {
  t: Translation;
}

const PracticeHub: React.FC<Props> = ({ t }) => {
  const tools = [
      {
          title: t.rationalization.tabs.game,
          desc: "Trebatu konjugatuak azkar kalkulatzen.",
          icon: Gamepad2,
          color: "text-neon-pink",
          bg: "bg-neon-pink/10",
          link: "/rationalization?tab=game"
      },
      {
          title: t.polynomials.tabs.ruffini,
          desc: "Ruffini praktika interaktiboa.",
          icon: Grid,
          color: "text-neon-cyan",
          bg: "bg-neon-cyan/10",
          link: "/polynomials?tab=ruffini&mode=practice"
      },
      {
          title: t.polynomials.tabs.factorizer,
          desc: "Polinomioak faktorizatzeko tresna.",
          icon: Wand2,
          color: "text-neon-cyan",
          bg: "bg-neon-cyan/10",
          link: "/polynomials?tab=factorizer"
      },
       {
          title: t.logarithms.tabs.visualizer,
          desc: "Ulertu logaritmoak bisualki.",
          icon: BrainCircuit,
          color: "text-neon-purple",
          bg: "bg-neon-purple/10",
          link: "/logarithms?tab=visualizer"
      },
      {
          title: t.logarithms.tabs.scale,
          desc: "Eskala sismikoa eta logaritmoak.",
          icon: Activity,
          color: "text-neon-purple",
          bg: "bg-neon-purple/10",
          link: "/logarithms?tab=scale"
      },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="text-center">
             <div className="inline-flex p-3 rounded-2xl bg-neon-cyan/10 text-neon-cyan mb-4">
                 <Gamepad2 size={32} />
             </div>
             <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
                 {t.practiceHub.title}
             </h2>
             <p className="text-gray-400 max-w-lg mx-auto">{t.practiceHub.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
                <Link 
                    key={i} 
                    to={tool.link}
                    className="glass-panel p-6 rounded-2xl border border-white/10 hover:bg-white/5 hover:-translate-y-1 transition-all group"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${tool.bg} ${tool.color}`}>
                            <tool.icon size={24} />
                        </div>
                        <div className="p-2 rounded-full bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                    <p className="text-gray-400 text-sm">{tool.desc}</p>
                    <div className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-neon-cyan transition-colors">
                        {t.practiceHub.play}
                    </div>
                </Link>
            ))}
        </div>

    </div>
  );
};

export default PracticeHub;
