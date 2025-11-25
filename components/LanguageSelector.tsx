import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ current, onChange }) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'eu', label: 'Euskara' },
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <div className="relative group z-50">
      <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all text-xs font-bold text-neon-cyan backdrop-blur-sm shadow-lg hover:shadow-[0_0_15px_rgba(0,206,201,0.3)]">
        <Globe size={14} />
        <span className="uppercase">{current}</span>
      </button>
      <div className="absolute right-0 top-full mt-2 w-32 py-1 bg-space-800 rounded-xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right backdrop-blur-xl">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onChange(lang.code)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
              current === lang.code ? 'text-neon-cyan font-bold' : 'text-gray-400'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;