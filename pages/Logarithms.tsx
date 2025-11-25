
import React, { useState, useEffect } from 'react';
import { Translation } from '../types';
import { useSearchParams } from 'react-router-dom';
import { RefreshCcw, Sliders, Eye } from 'lucide-react';

interface Props {
  t: Translation;
}

const Logarithms: React.FC<Props> = ({ t }) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'visualizer' | 'quiz' | 'explorer'>('visualizer');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['visualizer', 'quiz', 'explorer'].includes(tabParam)) {
        setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  // Visualizer State
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(3);
  const result = Math.pow(base, exponent);

  // Quiz State
  const quizQuestions = [
    { base: 2, result: 8, answer: 3 },
    { base: 10, result: 100, answer: 2 },
    { base: 5, result: 25, answer: 2 },
    { base: 3, result: 27, answer: 3 },
    { base: 2, result: 32, answer: 5 },
  ];
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Explorer State
  const [rule, setRule] = useState<'product' | 'quotient' | 'power'>('product');
  const [valA, setValA] = useState(4);
  const [valB, setValB] = useState(8);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === quizQuestions[quizIndex].answer) {
        setFeedback('correct');
        setTimeout(() => {
            setFeedback('idle');
            setUserAnswer('');
            setQuizIndex((prev) => (prev + 1) % quizQuestions.length);
        }, 1500);
    } else {
        setFeedback('wrong');
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex justify-between items-center">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{t.logarithms.title}</h2>
            <div className="flex bg-space-800 p-1 rounded-xl border border-white/10">
                {(['visualizer', 'quiz', 'explorer'] as const).map(tab => (
                    <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-neon-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        {t.logarithms.tabs[tab]}
                    </button>
                ))}
            </div>
      </div>

      {activeTab === 'visualizer' && (
        <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 flex flex-col gap-6 w-full">
                <div>
                    <h3 className="text-xl font-bold text-neon-purple mb-2">{t.logarithms.def_title}</h3>
                    <p className="text-gray-400">{t.logarithms.def_expl}</p>
                </div>
                
                <div className="bg-space-900/50 border border-white/10 p-6 rounded-2xl flex flex-col gap-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs uppercase font-bold text-gray-500">{t.logarithms.labels.base}</label>
                            <span className="font-mono text-neon-cyan font-bold">{base}</span>
                        </div>
                        <input 
                            type="range" min="2" max="5" step="1" 
                            value={base} onChange={(e) => setBase(parseInt(e.target.value))}
                            className="w-full accent-neon-purple h-2 bg-space-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                         <div className="flex justify-between mb-2">
                            <label className="text-xs uppercase font-bold text-gray-500">{t.logarithms.labels.exponent}</label>
                            <span className="font-mono text-neon-pink font-bold">{exponent}</span>
                        </div>
                        <input 
                            type="range" min="1" max="4" step="1" 
                            value={exponent} onChange={(e) => setExponent(parseInt(e.target.value))}
                            className="w-full accent-neon-purple h-2 bg-space-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-12 bg-space-800/50 rounded-3xl border border-white/5 w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-neon-purple/5 group-hover:bg-neon-purple/10 transition-colors"></div>
                
                <div className="relative w-full h-32 flex items-center justify-center font-mono text-4xl font-bold text-white z-10">
                    <div className="absolute top-0 left-0 text-[10px] font-sans uppercase tracking-widest text-gray-500">{t.logarithms.labels.exponential}</div>
                    <div className="mt-4 flex items-start">
                        <span className="text-neon-cyan">{base}</span>
                        <sup className="text-neon-pink text-2xl mt-1">{exponent}</sup> 
                        <span className="mx-4 text-gray-600">=</span> 
                        <span>{result}</span>
                    </div>
                </div>
                
                <div className="w-full h-px bg-white/10 my-4"></div>

                <div className="relative w-full h-32 flex items-center justify-center font-mono text-4xl font-bold text-white z-10">
                    <div className="absolute top-0 left-0 text-[10px] font-sans uppercase tracking-widest text-gray-500">{t.logarithms.labels.logarithm}</div>
                    <div className="mt-4 flex items-baseline">
                        <span className="text-gray-400 text-2xl mr-1">log</span>
                        <sub className="text-lg text-neon-cyan mr-4">{base}</sub>
                        <span>{result}</span>
                        <span className="mx-4 text-gray-600">=</span>
                        <span className="text-neon-pink">{exponent}</span>
                    </div>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="bg-space-800 rounded-3xl p-12 relative overflow-hidden border border-neon-purple/30 shadow-[0_0_50px_rgba(176,38,255,0.15)] text-center">
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-neon-purple/20 rounded-full blur-[80px]"></div>
             
             <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Calc Quiz</h3>
             
             <div className="flex flex-col items-center justify-center gap-8 relative z-10">
                 <div className="p-8 bg-black/40 rounded-2xl border border-white/10 min-w-[300px]">
                     <span className="font-mono text-5xl text-white">
                        log<sub className="text-2xl text-neon-cyan">{quizQuestions[quizIndex].base}</sub> {quizQuestions[quizIndex].result} = <span className="text-neon-pink">x</span>
                    </span>
                 </div>
                 
                 <div className="flex gap-4">
                     <input 
                        type="number" 
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        className="w-32 px-4 py-4 rounded-xl bg-space-900 border border-white/20 text-white font-bold text-center text-xl outline-none focus:border-neon-purple focus:shadow-[0_0_20px_rgba(176,38,255,0.3)] transition-all"
                        placeholder="?"
                    />
                     <button onClick={checkAnswer} className="bg-neon-purple text-white px-8 py-4 rounded-xl font-bold hover:bg-neon-purple/80 hover:scale-105 transition-all">Check</button>
                 </div>
                 
                 {feedback === 'correct' && <span className="text-green-400 font-bold text-lg animate-bounce">Correct!</span>}
                 {feedback === 'wrong' && <span className="text-red-400 font-bold text-lg animate-shake">Try Again</span>}
             </div>
        </div>
      )}

      {activeTab === 'explorer' && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col gap-8">
              <div className="flex justify-center gap-4">
                  {(['product', 'quotient', 'power'] as const).map(r => (
                      <button 
                        key={r} 
                        onClick={() => setRule(r)}
                        className={`px-6 py-2 rounded-full border text-sm font-bold transition-all uppercase tracking-wider
                        ${rule === r ? 'bg-white/10 border-neon-cyan text-neon-cyan' : 'border-white/10 text-gray-500 hover:text-white'}`}
                      >
                          {t.logarithms.rules[r]}
                      </button>
                  ))}
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                  <div className="w-full md:w-1/3 space-y-6">
                      <div>
                          <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Value A: {valA}</label>
                          <input type="range" min="2" max="32" value={valA} onChange={(e) => setValA(parseInt(e.target.value))} className="w-full accent-neon-cyan h-1 bg-gray-700 rounded"/>
                      </div>
                      <div>
                          <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Value B: {valB}</label>
                          <input type="range" min="2" max="32" value={valB} onChange={(e) => setValB(parseInt(e.target.value))} className="w-full accent-neon-pink h-1 bg-gray-700 rounded"/>
                      </div>
                  </div>

                  <div className="w-full md:w-2/3 bg-black/40 p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[200px]">
                       {rule === 'product' && (
                           <div className="text-center space-y-4">
                               <div className="text-3xl font-mono text-gray-400">log<sub className="text-sm">2</sub>(<span className="text-neon-cyan">{valA}</span> · <span className="text-neon-pink">{valB}</span>)</div>
                               <div className="text-2xl text-white font-bold">↓</div>
                               <div className="text-3xl font-mono text-white">
                                   log<sub className="text-sm">2</sub><span className="text-neon-cyan">{valA}</span> + log<sub className="text-sm">2</sub><span className="text-neon-pink">{valB}</span>
                               </div>
                               <div className="text-sm text-gray-500 mt-4 border-t border-white/10 pt-4">
                                   {Math.log2(valA * valB).toFixed(2)} = {Math.log2(valA).toFixed(2)} + {Math.log2(valB).toFixed(2)}
                               </div>
                           </div>
                       )}
                       {rule === 'quotient' && (
                           <div className="text-center space-y-4">
                               <div className="text-3xl font-mono text-gray-400">log<sub className="text-sm">2</sub>(<span className="text-neon-cyan">{valA}</span> / <span className="text-neon-pink">{valB}</span>)</div>
                               <div className="text-2xl text-white font-bold">↓</div>
                               <div className="text-3xl font-mono text-white">
                                   log<sub className="text-sm">2</sub><span className="text-neon-cyan">{valA}</span> - log<sub className="text-sm">2</sub><span className="text-neon-pink">{valB}</span>
                               </div>
                               <div className="text-sm text-gray-500 mt-4 border-t border-white/10 pt-4">
                                   {Math.log2(valA / valB).toFixed(2)} = {Math.log2(valA).toFixed(2)} - {Math.log2(valB).toFixed(2)}
                               </div>
                           </div>
                       )}
                       {rule === 'power' && (
                           <div className="text-center space-y-4">
                               <div className="text-3xl font-mono text-gray-400">log<sub className="text-sm">2</sub>(<span className="text-neon-cyan">{valA}</span><sup className="text-neon-pink">{Math.floor(valB/4)}</sup>)</div>
                               <div className="text-2xl text-white font-bold">↓</div>
                               <div className="text-3xl font-mono text-white">
                                   <span className="text-neon-pink">{Math.floor(valB/4)}</span> · log<sub className="text-sm">2</sub><span className="text-neon-cyan">{valA}</span>
                               </div>
                           </div>
                       )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Logarithms;
