
import React from 'react';
import { Translation } from '../types';
import { BookOpen, Calculator, Binary, LineChart, Lightbulb, ArrowRight, Info } from 'lucide-react';
import { MathFormula, MathFrac, MathRoot, MathSup, MathSub } from '../components/MathFormula';

interface Props {
  t: Translation;
}

const TheoryCard: React.FC<{ title: string; children: React.ReactNode; color: string; bg: string }> = ({ title, children, color, bg }) => (
    <div className={`p-8 rounded-2xl border border-white/5 shadow-lg flex flex-col gap-6 transition-all hover:scale-[1.01] ${bg}`}>
        <h4 className={`text-xl font-bold uppercase tracking-wider border-b border-white/10 pb-3 ${color}`}>
            {title}
        </h4>
        {/* Responsive text size: text-sm on mobile, text-lg on tablet/desktop */}
        <div className="text-gray-300 text-sm md:text-lg leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

const TheoryHub: React.FC<Props> = ({ t }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        
        {/* Header */}
        <div className="text-center">
             <div className="inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                 <BookOpen size={48} className="text-white" />
             </div>
             <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-4">
                 {t.theoryHub.title}
             </h2>
             <p className="text-gray-400 max-w-xl mx-auto text-xl">{t.theoryHub.desc}</p>
        </div>

        {/* 3-Column Grid for Topics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            
            {/* Rationalization Column */}
            <div className="flex flex-col gap-6">
                <div className="glass-panel p-6 rounded-3xl border-t-4 border-neon-pink flex items-center gap-4 bg-space-900/80">
                    <div className="p-3 bg-neon-pink/20 rounded-xl text-neon-pink"><Calculator size={24}/></div>
                    <h3 className="text-2xl font-bold text-white">{t.theoryHub.sections.rat}</h3>
                </div>
                
                <TheoryCard title={t.theoryHub.rat.case1_title} color="text-neon-pink" bg="bg-space-800/50">
                     <p>{t.theoryHub.rat.case1_desc}</p>
                     <div className="bg-black/30 p-6 rounded-xl flex justify-center mt-2">
                        <MathFormula>
                             <MathFrac num="a" den={<MathRoot content="b" />} />
                             <span className="mx-2 text-neon-pink">·</span>
                             <MathFrac num={<MathRoot content="b" />} den={<MathRoot content="b" />} />
                             <span className="mx-2">=</span>
                             <MathFrac num={<>a<MathRoot content="b" /></>} den="b" />
                        </MathFormula>
                     </div>
                </TheoryCard>

                <TheoryCard title={t.theoryHub.rat.case2_title} color="text-neon-pink" bg="bg-space-800/50">
                    <p>{t.theoryHub.rat.case2_desc}</p>
                    <div className="p-4 bg-neon-pink/10 border border-neon-pink/20 rounded-lg flex gap-3 items-start">
                        <Info size={20} className="text-neon-pink mt-1 shrink-0"/>
                        <span className="text-base text-neon-pink font-bold">{t.theoryHub.rat.conjugate_def}</span>
                    </div>
                    <div className="bg-black/30 p-6 rounded-xl flex justify-center mt-2 flex-col items-center gap-4">
                        <div className="text-sm text-gray-500 uppercase font-bold">Adibidea</div>
                        <MathFormula>
                             <MathFrac num="c" den={<><MathRoot content="a" /> + <MathRoot content="b" /></>} />
                             <span className="mx-2">·</span>
                             <MathFrac num={<><MathRoot content="a" /> - <MathRoot content="b" /></>} den={<><MathRoot content="a" /> - <MathRoot content="b" /></>} />
                        </MathFormula>
                         <div className="w-full h-px bg-white/10 my-1"></div>
                        <MathFormula>
                             (A + B)(A - B) = A<MathSup base="" exp="2" /> - B<MathSup base="" exp="2" />
                        </MathFormula>
                    </div>
                </TheoryCard>
            </div>

            {/* Polynomials Column */}
            <div className="flex flex-col gap-6">
                <div className="glass-panel p-6 rounded-3xl border-t-4 border-neon-cyan flex items-center gap-4 bg-space-900/80">
                    <div className="p-3 bg-neon-cyan/20 rounded-xl text-neon-cyan"><Binary size={24}/></div>
                    <h3 className="text-2xl font-bold text-white">{t.theoryHub.sections.poly}</h3>
                </div>

                <TheoryCard title={t.theoryHub.poly.identities} color="text-neon-cyan" bg="bg-space-800/50">
                    <ul className="space-y-6">
                        <li className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500 uppercase font-bold">Batuketa Karratua</span>
                            <div className="bg-black/30 p-4 rounded text-center"><MathFormula>(a + b)<MathSup base="" exp="2" /> = a<MathSup base="" exp="2" /> + 2ab + b<MathSup base="" exp="2" /></MathFormula></div>
                        </li>
                        <li className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500 uppercase font-bold">Kenketa Karratua</span>
                            <div className="bg-black/30 p-4 rounded text-center"><MathFormula>(a - b)<MathSup base="" exp="2" /> = a<MathSup base="" exp="2" /> - 2ab + b<MathSup base="" exp="2" /></MathFormula></div>
                        </li>
                        <li className="flex flex-col gap-2">
                             <span className="text-sm text-gray-500 uppercase font-bold">Biderkadura</span>
                            <div className="bg-black/30 p-4 rounded text-center"><MathFormula>(a + b)(a - b) = a<MathSup base="" exp="2" /> - b<MathSup base="" exp="2" /></MathFormula></div>
                        </li>
                    </ul>
                </TheoryCard>
                
                 <TheoryCard title="Ruffini Adibidea" color="text-neon-cyan" bg="bg-space-800/50">
                    <p className="text-base text-gray-400 mb-4">{t.theoryHub.poly.ruffini_def}</p>
                    <div className="bg-space-900 p-6 rounded-xl border border-white/10">
                        <div className="text-sm text-gray-500 uppercase mb-4 font-bold">Polinomioa: x³ - 2x² - 5x + 6 (Erroa: 1)</div>
                        {/* Responsive text size for Ruffini table: text-xs on mobile, text-lg on desktop */}
                        <div className="bg-black/30 p-4 rounded font-mono text-xs md:text-lg flex justify-center overflow-x-auto">
                            <div className="grid grid-cols-[auto_1fr] gap-x-4 border-l-2 border-white/50 pl-4">
                                {/* Row 1 */}
                                <div></div>
                                <div className="flex gap-6 border-b border-white/50 pb-2 mb-2 justify-between">
                                    <span className="font-bold">1</span>
                                    <span>-2</span>
                                    <span>-5</span>
                                    <span>6</span>
                                </div>

                                {/* Row 2 */}
                                <div className="font-bold text-neon-cyan pt-1 text-right pr-4">1</div>
                                <div className="flex gap-6 pt-1 text-gray-400 justify-between">
                                    <span>↓</span>
                                    <span className="text-neon-cyan">1</span>
                                    <span className="text-neon-cyan">-1</span>
                                    <span className="text-neon-cyan">-6</span>
                                </div>

                                {/* Row 3 */}
                                <div className="border-t-2 border-white/50 mt-2"></div>
                                <div className="flex gap-6 border-t-2 border-white/50 pt-2 mt-2 font-bold justify-between">
                                    <span className="text-white">1</span>
                                    <span className="text-white">-1</span>
                                    <span className="text-white">-6</span>
                                    <span className="text-neon-pink bg-neon-pink/20 px-2 rounded">0</span>
                                </div>
                            </div>
                        </div>
                        {/* Responsive text size for steps: text-xs on mobile, text-base on desktop */}
                        <div className="mt-6 text-xs md:text-base text-gray-400 space-y-2 border-t border-white/10 pt-4">
                            <p>1. Koefizienteak idatzi eta lehenengoa jaitsi.</p>
                            <p>2. Erroarekin (1) biderkatu eta hurrengo zutabean jarri.</p>
                            <p>3. Batu eta prozesua errepikatu hondarra 0 izan arte.</p>
                        </div>
                    </div>
                 </TheoryCard>
            </div>

            {/* Logarithms Column */}
            <div className="flex flex-col gap-6">
                 <div className="glass-panel p-6 rounded-3xl border-t-4 border-neon-purple flex items-center gap-4 bg-space-900/80">
                    <div className="p-3 bg-neon-purple/20 rounded-xl text-neon-purple"><LineChart size={24}/></div>
                    <h3 className="text-2xl font-bold text-white">{t.theoryHub.sections.log}</h3>
                </div>

                <TheoryCard title="Definizioa" color="text-neon-purple" bg="bg-space-800/50">
                    <p>{t.theoryHub.log.def}</p>
                    <div className="bg-black/30 p-6 rounded-xl flex justify-center mt-4">
                         <MathFormula>log<MathSub base="" sub="a" />x = b <span className="mx-2 text-neon-purple">⇔</span> a<MathSup base="" exp="b" /> = x</MathFormula>
                    </div>
                </TheoryCard>

                <TheoryCard title={t.theoryHub.log.prop_title} color="text-neon-purple" bg="bg-space-800/50">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                             <span className="text-sm text-gray-400 uppercase font-bold">Product</span>
                             <div className="bg-black/30 p-2 rounded text-center"><MathFormula>log(A·B) = log A + log B</MathFormula></div>
                        </div>
                        <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                             <span className="text-sm text-gray-400 uppercase font-bold">Quotient</span>
                             <div className="bg-black/30 p-2 rounded text-center"><MathFormula>log(<MathFrac num="A" den="B" />) = log A - log B</MathFormula></div>
                        </div>
                         <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                             <span className="text-sm text-gray-400 uppercase font-bold">Power</span>
                             <div className="bg-black/30 p-2 rounded text-center"><MathFormula>log(A<MathSup base="" exp="n" />) = n · log A</MathFormula></div>
                        </div>
                         <div className="flex flex-col gap-2">
                             <span className="text-sm text-gray-400 uppercase font-bold">Root</span>
                             <div className="bg-black/30 p-2 rounded text-center"><MathFormula>log(<MathRoot idx="n" content="A" />) = <MathFrac num="log A" den="n" /></MathFormula></div>
                        </div>
                    </div>
                </TheoryCard>

                <TheoryCard title={t.theoryHub.log.base_change} color="text-neon-purple" bg="bg-space-800/50">
                    <div className="bg-black/30 p-6 rounded-xl flex justify-center">
                        <MathFormula>
                            log<MathSub base="" sub="a" />x = <MathFrac num={<>log<MathSub base="" sub="b" />x</>} den={<>log<MathSub base="" sub="b" />a</>} />
                        </MathFormula>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">{t.theoryHub.log.special_logs}</p>
                </TheoryCard>
            </div>
        </div>

    </div>
  );
};

export default TheoryHub;
