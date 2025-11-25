
import React from 'react';
import { Translation } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Gamepad2, GraduationCap, Binary, Calculator, LineChart } from 'lucide-react';

interface Props {
  t: Translation;
}

const Home: React.FC<Props> = ({ t }) => {
  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-space-800 to-space-900 border border-white/10 p-8 md:p-20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue rounded-full blur-[120px] opacity-20 -ml-20 -mb-20"></div>
        
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-neon-cyan/50 text-neon-cyan text-xs font-bold tracking-[0.2em] mb-8 shadow-[0_0_15px_rgba(0,206,201,0.2)]">
            DBH 4 / GRADE 10
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold font-sans mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-2xl">
            {t.home.welcome}
          </h2>
          <p className="text-gray-300 text-xl leading-relaxed mb-10 max-w-xl font-light">
            {t.home.description}
          </p>
          <div className="flex flex-wrap gap-4">
             <Link 
              to="/exams" 
              className="inline-flex items-center gap-3 bg-neon-cyan text-space-900 px-8 py-4 rounded-xl font-extrabold hover:bg-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,206,201,0.4)]"
            >
              {t.home.start} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        
        {/* Floating Abstract Geo */}
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden lg:block opacity-60">
            <div className="w-64 h-64 border-2 border-neon-pink/30 rounded-full animate-float blur-sm"></div>
            <div className="w-48 h-48 border-2 border-neon-blue/30 rounded-full absolute top-8 left-8 animate-float animation-delay-2000"></div>
        </div>
      </section>

      {/* Main Mode Buttons - Now Functional Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
            { 
                icon: BookOpen, 
                color: 'text-neon-pink', 
                bg: 'bg-neon-pink/10',
                border: 'hover:border-neon-pink/50',
                title: t.home.features.theory, 
                desc: t.home.features_desc.theory,
                link: '/theory'
            },
            { 
                icon: Gamepad2, 
                color: 'text-neon-cyan', 
                bg: 'bg-neon-cyan/10',
                border: 'hover:border-neon-cyan/50',
                title: t.home.features.practice, 
                desc: t.home.features_desc.practice,
                link: '/practice'
            },
            { 
                icon: GraduationCap, 
                color: 'text-neon-purple', 
                bg: 'bg-neon-purple/10',
                border: 'hover:border-neon-purple/50',
                title: t.home.features.exams, 
                desc: t.home.features_desc.exams,
                link: '/exams'
            }
        ].map((feature, i) => (
            <Link 
                to={feature.link} 
                key={i} 
                className={`glass-panel p-8 rounded-3xl transition-all group border-t border-white/10 ${feature.border} hover:-translate-y-2 hover:bg-white/5 relative overflow-hidden`}
            >
              <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 font-light">{feature.desc}</p>
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="text-white" />
              </div>
            </Link>
        ))}
      </section>

      {/* Quick Topic Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/polynomials" className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-space-800 to-space-700 border border-white/5 hover:border-neon-blue/50 transition-all">
            <div className="absolute right-0 top-0 p-20 bg-neon-blue/20 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-neon-blue/30 transition-all"></div>
            <Binary className="text-neon-blue mb-4" size={32} />
            <h4 className="text-xl font-bold mb-1">{t.nav.polynomials}</h4>
            <span className="text-xs text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">{t.home.topics_subtitle.poly}</span>
        </Link>
        
        <Link to="/rationalization" className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-space-800 to-space-700 border border-white/5 hover:border-neon-pink/50 transition-all">
            <div className="absolute right-0 top-0 p-20 bg-neon-pink/20 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-neon-pink/30 transition-all"></div>
            <Calculator className="text-neon-pink mb-4" size={32} />
            <h4 className="text-xl font-bold mb-1">{t.nav.rationalization}</h4>
            <span className="text-xs text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">{t.home.topics_subtitle.rat}</span>
        </Link>

        <Link to="/logarithms" className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-space-800 to-space-700 border border-white/5 hover:border-neon-purple/50 transition-all">
            <div className="absolute right-0 top-0 p-20 bg-neon-purple/20 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-neon-purple/30 transition-all"></div>
            <LineChart className="text-neon-purple mb-4" size={32} />
            <h4 className="text-xl font-bold mb-1">{t.nav.logarithms}</h4>
            <span className="text-xs text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">{t.home.topics_subtitle.log}</span>
        </Link>
      </section>
    </div>
  );
};

export default Home;
