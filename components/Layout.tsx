
import React, { useState } from 'react';
import { Language, content } from '../types';
import LanguageSelector from './LanguageSelector';
import { Menu, X, Calculator, SquareSigma, FunctionSquare, LayoutGrid, Box, BookOpen, GraduationCap } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

const Layout: React.FC<Props> = ({ lang, setLang }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = content[lang];
  const isRtl = lang === 'ar';

  const navItems = [
    { path: '/', label: t.nav.home, icon: LayoutGrid },
    { path: '/theory', label: t.nav.theory, icon: BookOpen },
    { path: '/rationalization', label: t.nav.rationalization, icon: Calculator },
    { path: '/polynomials', label: t.nav.polynomials, icon: Box },
    { path: '/logarithms', label: t.nav.logarithms, icon: FunctionSquare },
    { path: '/exams', label: t.nav.exams, icon: GraduationCap },
  ];

  return (
    <div className={`min-h-screen text-white font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-space-900/60 backdrop-blur-xl border-b border-white/10 h-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-tr from-neon-purple to-neon-blue rounded-xl flex items-center justify-center text-white font-bold font-mono shadow-[0_0_15px_rgba(113,88,226,0.5)]">
               √
             </div>
             <div>
               <h1 className="font-bold text-xl leading-none text-white tracking-tight">{t.title}</h1>
               <p className="text-[10px] text-neon-cyan font-bold tracking-[0.2em] uppercase mt-1">{t.subtitle}</p>
             </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2 border border-transparent
                  ${isActive 
                    ? 'bg-white/10 text-neon-cyan border-white/20 shadow-[0_0_15px_rgba(0,206,201,0.2)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.icon && <item.icon size={16} />}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSelector current={lang} onChange={setLang} />
            <button 
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-space-900/95 backdrop-blur-xl p-4 lg:hidden animate-in fade-in slide-in-from-top-5">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-4 rounded-xl text-lg font-bold transition-all flex items-center gap-3 border
                  ${isActive 
                    ? 'bg-white/10 text-neon-cyan border-neon-cyan/30' 
                    : 'text-gray-400 border-transparent hover:bg-white/5'
                  }`
                }
              >
                 {item.icon && <item.icon size={20} />}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
