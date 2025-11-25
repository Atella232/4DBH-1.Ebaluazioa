
import React, { useState } from 'react';
import { Translation } from '../types';
import { GraduationCap, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { MathFormula, MathFrac, MathRoot, MathSup, MathSub } from '../components/MathFormula';

interface Props {
  t: Translation;
}

const Exams: React.FC<Props> = ({ t }) => {
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const toggleSolution = (id: number) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const exams = [
    {
        id: 1,
        title: "Azterketa 1: Arrazionalizazioa",
        questions: [
            {
                id: 101,
                title: t.exams.questions.rat_q1,
                problem: <MathFormula><MathFrac num="5" den={<MathRoot content="3" />} /></MathFormula>,
                steps: [
                    { desc: "Biderkatu zenbakitzailea eta izendatzailea erro berarekin.", math: <MathFormula><MathFrac num={<>5<MathRoot content="3" /></>} den={<><MathRoot content="3" /> · <MathRoot content="3" /></>} /></MathFormula> },
                    { desc: "Sinplifikatu izendatzailea.", math: <MathFormula><MathFrac num={<>5<MathRoot content="3" /></>} den="3" /></MathFormula> }
                ]
            },
            {
                id: 102,
                title: t.exams.questions.rat_q2,
                problem: <MathFormula><MathFrac num="2" den={<><MathRoot content="5" /> - 1</>} /></MathFormula>,
                steps: [
                    { desc: "Konjugatuarekin biderkatu.", math: <MathFormula><MathFrac num={<>2(<MathRoot content="5" /> + 1)</>} den={<>(<MathRoot content="5" /> - 1)(<MathRoot content="5" /> + 1)</>} /></MathFormula> },
                    { desc: "Izendatzailean identitate nabarmena: a² - b².", math: <MathFormula><MathFrac num={<>2(<MathRoot content="5" /> + 1)</>} den="5 - 1" /></MathFormula> },
                    { desc: "Sinplifikatu.", math: <MathFormula><MathFrac num={<>2(<MathRoot content="5" /> + 1)</>} den="4" /> = <MathFrac num={<><MathRoot content="5" /> + 1</>} den="2" /></MathFormula> }
                ]
            },
            {
                id: 103,
                title: t.exams.questions.rat_q3,
                problem: <MathFormula><MathFrac num={<><MathRoot content="3" /> + <MathRoot content="2" /></>} den={<><MathRoot content="3" /> - <MathRoot content="2" /></>} /></MathFormula>,
                steps: [
                    { desc: "Konjugatuarekin biderkatu.", math: <MathFormula><MathFrac num={<>(<MathRoot content="3" /> + <MathRoot content="2" />)<MathSup base="" exp="2" /></>} den="3 - 2" /></MathFormula> },
                    { desc: "Zenbakitzailea garatu: (a+b)².", math: <MathFormula>3 + 2<MathRoot content="6" /> + 2</MathFormula> },
                    { desc: "Emaitza finala.", math: <MathFormula>5 + 2<MathRoot content="6" /></MathFormula> }
                ]
            },
            {
                id: 104,
                title: t.exams.questions.rat_q4,
                problem: <MathFormula><MathFrac num="x" den={<MathRoot content="x" />} /></MathFormula>,
                steps: [
                    { desc: "Biderkatu erroarekin.", math: <MathFormula><MathFrac num={<>x<MathRoot content="x" /></>} den="x" /></MathFormula> },
                    { desc: "Sinplifikatu x.", math: <MathFormula><MathRoot content="x" /></MathFormula> }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Azterketa 2: Polinomioak",
        questions: [
            {
                id: 201,
                title: t.exams.questions.poly_q1,
                problem: <MathFormula>P(x) = x<MathSup base="" exp="3" /> - 8</MathFormula>,
                steps: [
                    { desc: "Identifikatu: a³ - b³ = (a-b)(a² + ab + b²).", math: <MathFormula>x<MathSup base="" exp="3" /> - 2<MathSup base="" exp="3" /></MathFormula> },
                    { desc: "Aplikatu formula.", math: <MathFormula>(x - 2)(x<MathSup base="" exp="2" /> + 2x + 4)</MathFormula> }
                ]
            },
            {
                id: 202,
                title: t.exams.questions.poly_q2,
                problem: <MathFormula><MathFrac num={<>x<MathSup base="" exp="2" /> - 1</>} den={<>x + 1</>} /></MathFormula>,
                steps: [
                    { desc: "Faktorizatu zenbakitzailea: Diferentzia karratua.", math: <MathFormula>(x + 1)(x - 1)</MathFormula> },
                    { desc: "Sinplifikatu.", math: <MathFormula><MathFrac num={<>(x + 1)(x - 1)</>} den="x + 1" /> = x - 1</MathFormula> }
                ]
            },
            {
                id: 203,
                title: t.exams.questions.poly_q3,
                problem: <MathFormula>P(x) = x<MathSup base="" exp="3" /> - 2x<MathSup base="" exp="2" /> - 5x + 6</MathFormula>,
                steps: [
                    { desc: "Ruffini erabili (erroa x=1).", math: "Ruffini(1) -> 0" },
                    { desc: "Zatidura lortu.", math: <MathFormula>x<MathSup base="" exp="2" /> - x - 6</MathFormula> },
                    { desc: "Bigarren mailakoa ebatzi.", math: <MathFormula>(x - 3)(x + 2)</MathFormula> },
                    { desc: "Emaitza osoa.", math: <MathFormula>(x - 1)(x - 3)(x + 2)</MathFormula> }
                ]
            },
            {
                id: 204,
                title: t.exams.questions.poly_q4,
                problem: <MathFormula>(2x + 3)<MathSup base="" exp="2" /></MathFormula>,
                steps: [
                    { desc: "Identitatea: (a+b)² = a² + 2ab + b².", math: <MathFormula>(2x)<MathSup base="" exp="2" /> + 2(2x)(3) + 3<MathSup base="" exp="2" /></MathFormula> },
                    { desc: "Eragiketak egin.", math: <MathFormula>4x<MathSup base="" exp="2" /> + 12x + 9</MathFormula> }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Azterketa 3: Logaritmoak",
        questions: [
            {
                id: 301,
                title: t.exams.questions.log_q1,
                problem: <MathFormula>log<MathSub base="" sub="2" />32 = x</MathFormula>,
                steps: [
                    { desc: "Definizioa aplikatu.", math: <MathFormula>2<MathSup base="" exp="x" /> = 32</MathFormula> },
                    { desc: "32 berreketa bezala idatzi.", math: <MathFormula>2<MathSup base="" exp="x" /> = 2<MathSup base="" exp="5" /></MathFormula> },
                    { desc: "Emaitza.", math: <MathFormula>x = 5</MathFormula> }
                ]
            },
            {
                id: 302,
                title: t.exams.questions.log_q2,
                problem: <MathFormula>log x + log 2 = 1</MathFormula>,
                steps: [
                    { desc: "Biderkadura propietatea.", math: <MathFormula>log(2x) = 1</MathFormula> },
                    { desc: "Definizioa (base 10).", math: <MathFormula>10<MathSup base="" exp="1" /> = 2x</MathFormula> },
                    { desc: "Ebatzi.", math: <MathFormula>x = 5</MathFormula> }
                ]
            },
            {
                id: 303,
                title: t.exams.questions.log_q3,
                problem: <MathFormula>log(a<MathSup base="" exp="2" />b)</MathFormula>,
                steps: [
                    { desc: "Biderkadura banatu.", math: <MathFormula>log(a<MathSup base="" exp="2" />) + log(b)</MathFormula> },
                    { desc: "Berreketa jaitsi.", math: <MathFormula>2log(a) + log(b)</MathFormula> }
                ]
            },
            {
                id: 304,
                title: t.exams.questions.log_q4,
                problem: <MathFormula>3<MathSup base="" exp="x" /> = 9</MathFormula>,
                steps: [
                    { desc: "Oinarri berdina lortu.", math: <MathFormula>3<MathSup base="" exp="x" /> = 3<MathSup base="" exp="2" /></MathFormula> },
                    { desc: "Emaitza.", math: <MathFormula>x = 2</MathFormula> }
                ]
            }
        ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="text-center">
             <div className="inline-flex p-3 rounded-2xl bg-neon-purple/10 text-neon-purple mb-4">
                 <GraduationCap size={32} />
             </div>
             <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
                 {t.exams.title}
             </h2>
             <p className="text-gray-400 max-w-lg mx-auto">{t.exams.desc}</p>
        </div>

        <div className="space-y-12">
            {exams.map(exam => (
                <div key={exam.id} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest">{exam.title}</h3>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exam.questions.map(q => (
                        <div key={q.id} className="glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col">
                            <div className="p-6 bg-space-900/40 border-b border-white/5 flex-grow">
                                <div className="text-neon-cyan text-sm font-bold uppercase mb-4 tracking-wider">{q.title}</div>
                                <div className="text-white flex justify-center py-4">{q.problem}</div>
                            </div>
                            
                            <div className="p-4 bg-white/5 flex justify-center">
                                <button 
                                    onClick={() => toggleSolution(q.id)}
                                    className={`w-full py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all 
                                        ${revealedSolutions[q.id] 
                                            ? 'bg-white/10 text-white hover:bg-white/20' 
                                            : 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/30'
                                        }`}
                                >
                                    {revealedSolutions[q.id] ? <><EyeOff size={18}/> {t.exams.hide_solution}</> : <><Eye size={18}/> {t.exams.show_solution}</>}
                                </button>
                            </div>

                            {revealedSolutions[q.id] && (
                                <div className="p-6 bg-black/40 animate-in slide-in-from-top-4 duration-300 border-t border-white/10">
                                    <div className="space-y-8 relative">
                                        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-white/10"></div>
                                        {q.steps.map((step, idx) => (
                                            <div key={idx} className="relative flex gap-6">
                                                {/* Responsive circle size: w-6 h-6 on mobile, w-8 h-8 on desktop. Text-xs vs text-base */}
                                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-space-800 border border-neon-cyan text-neon-cyan font-bold flex items-center justify-center shrink-0 z-10 text-xs md:text-base">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    {/* Responsive text size: text-xs on mobile, text-base on desktop */}
                                                    <p className="text-gray-400 text-xs md:text-base mb-2">{step.desc}</p>
                                                    <div className="text-white text-xl">
                                                        {step.math}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <div className="flex gap-6 pt-2 items-center">
                                            <div className="w-8 h-8 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={24} className="text-green-500" />
                                            </div>
                                            <div className="font-bold text-green-400 text-lg uppercase tracking-wider">{t.exams.correct_answer}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>

    </div>
  );
};

export default Exams;
