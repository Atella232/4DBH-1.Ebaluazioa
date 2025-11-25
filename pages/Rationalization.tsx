
import React, { useState, useEffect } from 'react';
import { Translation } from '../types';
import { useSearchParams } from 'react-router-dom';
import { Check, X, RefreshCw, Timer, Trophy, Play, ArrowDown } from 'lucide-react';

interface Props {
  t: Translation;
}

const Rationalization: React.FC<Props> = ({ t }) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz' | 'game'>('theory');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['theory', 'quiz', 'game'].includes(tabParam)) {
        setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  // -- Quiz State --
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // -- Game State --
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameExpression, setGameExpression] = useState({ expr: '', conj: '' });
  const [gameOptions, setGameOptions] = useState<string[]>([]);
  const [gameFeedback, setGameFeedback] = useState<'none'|'correct'|'wrong'>('none');

  const quizQuestions = [
    { id: 1, latex: "1", denom: "√2 + 1", options: [{ id: 0, text: "√2 - 1" }, { id: 1, text: "√2 + 1" }, { id: 2, text: "2 - √2" }], correct: 0 },
    { id: 2, latex: "5", denom: "2√3 - √5", options: [{ id: 0, text: "2√3 + √5" }, { id: 1, text: "(2√3 + √5)/7" }, { id: 2, text: "(10√3 + 5√5)/7" }], correct: 2 },
    { id: 3, latex: "3", denom: "√3 - √2", options: [{ id: 0, text: "3(√3 + √2)" }, { id: 1, text: "3√3 - 3√2" }, { id: 2, text: "√3 + √2" }], correct: 0 }
  ];

  // Game Logic
  const gamePairs = [
      { expr: "√5 - 2", conj: "√5 + 2" },
      { expr: "3 + √7", conj: "3 - √7" },
      { expr: "√a + √b", conj: "√a - √b" },
      { expr: "2√3 - 1", conj: "2√3 + 1" },
      { expr: "1 - √2", conj: "1 + √2" },
      { expr: "√x + 5", conj: "√x - 5" },
  ];

  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
        timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
        setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const generateGameRound = () => {
      const pair = gamePairs[Math.floor(Math.random() * gamePairs.length)];
      setGameExpression(pair);
      
      // Generate distractors
      const distractors = gamePairs
          .filter(p => p.conj !== pair.conj)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(p => p.conj);
      
      const opts = [pair.conj, ...distractors].sort(() => 0.5 - Math.random());
      setGameOptions(opts);
  };

  const startGame = () => {
      setScore(0);
      setTimeLeft(30);
      setIsPlaying(true);
      generateGameRound();
  };

  const checkGameAnswer = (ans: string) => {
      if (!isPlaying) return;
      if (ans === gameExpression.conj) {
          setScore(s => s + 10);
          setGameFeedback('correct');
          setTimeout(() => {
              setGameFeedback('none');
              generateGameRound();
          }, 300);
      } else {
          setScore(s => Math.max(0, s - 5));
          setGameFeedback('wrong');
          setTimeout(() => setGameFeedback('none'), 300);
      }
  };

  const handleQuizCheck = () => {
    if (selectedOption === null) return;
    setIsCorrect(selectedOption === quizQuestions[currentQuestion].correct);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % quizQuestions.length);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{t.rationalization.title}</h2>
          <div className="flex bg-space-800 p-1 rounded-xl border border-white/10">
                {(['theory', 'quiz', 'game'] as const).map(tab => (
                    <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-neon-pink text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        {t.rationalization.tabs[tab]}
                    </button>
                ))}
            </div>
      </div>

      {activeTab === 'theory' && (
           <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-lg flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-bold text-neon-pink mb-4">{t.rationalization.theory_title}</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{t.rationalization.conjugate_expl}</p>
                    <div className="mt-8 p-6 bg-space-900/80 rounded-2xl border border-neon-pink/30 shadow-[0_0_20px_rgba(253,121,168,0.1)]">
                        <span className="font-mono text-xl text-white block text-center">(a + √b) · (a - √b) = a² - b</span>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                     <div className="relative p-10">
                        <div className="absolute inset-0 bg-neon-pink/20 rounded-full blur-3xl animate-pulse-glow"></div>
                        <div className="relative text-center bg-space-900 p-8 rounded-2xl border border-white/20">
                            <div className="text-xs text-neon-pink uppercase tracking-widest mb-4 font-bold">Example</div>
                            <div className="text-3xl font-mono text-white flex flex-col items-center gap-2">
                                <span className="border-b border-white px-2">1</span>
                                <span>√2 + 1</span>
                                <ArrowDown size={24} className="text-gray-500 my-2" />
                                <span className="text-neon-cyan">√2 - 1</span>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
      )}

      {activeTab === 'quiz' && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white">Quiz</h3>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-mono">{currentQuestion + 1} / {quizQuestions.length}</span>
             </div>
             
             <div className="flex flex-col items-center gap-8">
                <div className="scale-125 p-8 bg-space-800 rounded-2xl border border-white/10 shadow-lg">
                     <div className="font-mono text-2xl flex flex-col items-center">
                        <span className="border-b-2 border-white px-4 mb-2">{quizQuestions[currentQuestion].latex}</span>
                        <span>{quizQuestions[currentQuestion].denom}</span>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {quizQuestions[currentQuestion].options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => { if (isCorrect === null) setSelectedOption(idx); }}
                            className={`p-6 rounded-xl border transition-all duration-300 flex items-center justify-center min-h-[80px]
                                ${selectedOption === idx 
                                    ? (isCorrect === null ? 'border-neon-cyan bg-neon-cyan/20 text-white' : isCorrect && idx === quizQuestions[currentQuestion].correct ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20') 
                                    : 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-gray-300'
                                }
                            `}
                        >
                           <div className="text-xl font-mono">{opt.text}</div>
                        </button>
                    ))}
                </div>

                <div className="h-12 w-full flex justify-center items-center">
                    {selectedOption !== null && isCorrect === null && (
                        <button 
                            onClick={handleQuizCheck}
                            className="px-10 py-3 bg-neon-cyan text-space-900 rounded-full font-bold shadow-[0_0_20px_rgba(0,206,201,0.5)] hover:bg-white transition-all active:scale-95"
                        >
                            Check
                        </button>
                    )}
                    {isCorrect !== null && (
                        <div className="flex items-center gap-4 animate-in zoom-in">
                             {isCorrect 
                                ? <div className="text-green-400 font-bold flex items-center gap-2"><Check /> Correct</div>
                                : <div className="text-red-400 font-bold flex items-center gap-2"><X /> Incorrect</div>
                             }
                             <button onClick={nextQuestion} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2">
                                Next <RefreshCw size={14}/>
                             </button>
                        </div>
                    )}
                </div>
             </div>
          </div>
      )}

      {activeTab === 'game' && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
              {!isPlaying ? (
                  <div className="text-center">
                      <Trophy size={64} className="text-neon-pink mx-auto mb-6 animate-float" />
                      <h3 className="text-4xl font-extrabold text-white mb-4">{t.rationalization.game_title}</h3>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto">{t.rationalization.game_desc}</p>
                      <button onClick={startGame} className="px-12 py-4 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full text-white font-bold text-xl shadow-[0_0_30px_rgba(253,121,168,0.4)] hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                          <Play fill="white" /> {t.rationalization.start_game}
                      </button>
                      {score > 0 && <p className="mt-6 text-neon-cyan font-mono">Last Score: {score}</p>}
                  </div>
              ) : (
                  <div className="w-full max-w-2xl">
                      <div className="flex justify-between items-center mb-8">
                          <div className="flex items-center gap-2 bg-space-900 px-4 py-2 rounded-lg border border-neon-purple/50">
                              <Trophy size={18} className="text-neon-purple"/>
                              <span className="font-mono font-bold text-xl">{score}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-space-900 px-4 py-2 rounded-lg border border-neon-cyan/50">
                              <Timer size={18} className="text-neon-cyan"/>
                              <span className={`font-mono font-bold text-xl ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
                          </div>
                      </div>

                      <div className="flex flex-col items-center gap-8">
                          <div className={`p-10 rounded-2xl bg-space-800 border-2 shadow-2xl transition-all duration-200 transform
                                ${gameFeedback === 'correct' ? 'border-green-500 scale-105' : gameFeedback === 'wrong' ? 'border-red-500 shake' : 'border-white/20'}
                          `}>
                              <span className="text-4xl font-mono font-bold text-white">{gameExpression.expr}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 w-full">
                              {gameOptions.map((opt, i) => (
                                  <button 
                                    key={i}
                                    onClick={() => checkGameAnswer(opt)}
                                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-neon-cyan/50 transition-all font-mono text-xl text-gray-200 hover:text-white hover:shadow-[0_0_15px_rgba(0,206,201,0.2)]"
                                  >
                                      {opt}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              )}
          </div>
      )}

    </div>
  );
};

export default Rationalization;
