
import React, { useState, useEffect } from 'react';
import { Translation } from '../types';
import { useSearchParams } from 'react-router-dom';
import { ArrowDown, Box, Sigma, Wand2, Calculator, Gamepad2, CheckCircle2, XCircle, ArrowRight, Play, RefreshCw, BookOpen, ChevronRight, Plus, Minus, X } from 'lucide-react';

interface Props {
  t: Translation;
}

// --- Display Component for Superscripts ---
const PolyDisplay: React.FC<{ coeffs: number[], highlightIndex?: number }> = ({ coeffs, highlightIndex }) => {
    const degree = coeffs.length - 1;
    const parts = coeffs.map((coef, index) => {
        if (coef === 0 && degree > 0) return null; // Don't hide 0 if it's the only term (degree 0)
        
        let sign = coef >= 0 ? (index === 0 ? '' : ' + ') : ' - ';
        let absCoef = Math.abs(coef);
        let power = degree - index;
        
        // Logic to hide coefficient 1 unless it's the constant term
        let showCoef = (absCoef !== 1) || (power === 0);
        
        const isHighlight = highlightIndex === index;

        return (
            <span key={index} className={`${isHighlight ? 'text-neon-pink font-bold scale-110 inline-block' : ''}`}>
                {sign}
                {showCoef ? absCoef : ''}
                {power > 0 && 'x'}
                {power > 1 && <sup className="text-sm">{power}</sup>}
            </span>
        );
    });

    return (
        <span className="font-mono text-xl md:text-2xl tracking-wide">
            {parts.filter(p => p !== null).length > 0 ? parts : '0'}
        </span>
    );
};

// Helper functions for the Factorizer
function getDivisors(n: number) {
    if (n === 0) return [];
    n = Math.abs(n);
    let divs = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) { divs.push(i); divs.push(-i); }
    }
    return divs.sort((a, b) => a - b);
}

// 30 Sets of roots that ensure d != 0 (no root is 0)
const PRACTICE_DATASETS = [
    [1, 2, 3], [1, 2, -3], [1, -2, 3], [1, -2, -3],
    [-1, 2, 3], [-1, 2, -3], [-1, -2, 3], [-1, -2, -3],
    [1, 1, 2], [1, 1, -2], [1, -1, 2], [1, -1, -2],
    [-1, -1, 2], [-1, -1, -2], [2, 2, 3], [2, 2, -3],
    [2, -2, 3], [2, -2, -3], [-2, -2, 3], [-2, -2, -3],
    [1, 2, 4], [1, 2, -4], [1, -2, 4], [1, -2, -4],
    [1, 3, 4], [2, 3, -1], [-1, -3, 2], [1, 1, 1],
    [-1, -1, -1], [2, 2, 2]
];

interface Step {
    title: string;
    desc: string;
    math: React.ReactNode;
    badge: string;
}

const Polynomials: React.FC<Props> = ({ t }) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'identities' | 'ruffini' | 'factorizer'>('identities');
  
  // -- Ruffini States --
  const [ruffiniMode, setRuffiniMode] = useState<'example' | 'practice'>('example');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const modeParam = searchParams.get('mode');

    if (tabParam && ['identities', 'ruffini', 'factorizer'].includes(tabParam)) {
        setActiveTab(tabParam as any);
    }
    if (modeParam && ['example', 'practice'].includes(modeParam)) {
        setRuffiniMode(modeParam as any);
        if (modeParam === 'practice') {
            initPractice(); // Ensure practice is initialized if linked directly
        }
    }
  }, [searchParams]);
  
  // -- Identities State --
  const [idType, setIdType] = useState<'sum' | 'diff' | 'sumdiff'>('sum');
  const [termA, setTermA] = useState({ coef: 1, power: 1 });
  const [termB, setTermB] = useState({ coef: 3, power: 0 });
  
  
  // Practice Mode State
  const [practicePoly, setPracticePoly] = useState<number[]>([]);
  const [practiceRootGuess, setPracticeRootGuess] = useState('');
  const [tableState, setTableState] = useState<'input_root' | 'filling'>('input_root');
  // Table values: Rows 2 and 3. Coeffs are Row 1.
  // Row 2 (Multiplications): length = poly.length. First is 0/empty.
  // Row 3 (Additions): length = poly.length. First is copy of coeff[0].
  const [userTable, setUserTable] = useState<{rowMul: string[], rowAdd: string[]}>({rowMul: [], rowAdd: []});
  const [practiceFeedback, setPracticeFeedback] = useState<'none'|'correct'|'math_error'|'bad_root'>('none');

  // -- Factorizer State --
  const [coeffsInput, setCoeffsInput] = useState({ a: 1, b: -2, c: -5, d: 6, e: 0 }); 
  const [factorSteps, setFactorSteps] = useState<Step[]>([]);

  // --- Identities Logic ---
  const renderIdentityMath = () => {
      // Calculate expanded terms
      // Term A squared: (coef*x^pow)^2 = coef^2 * x^(2*pow)
      const aSqCoef = termA.coef * termA.coef;
      const aSqPow = termA.power * 2;
      
      // Term B squared
      const bSqCoef = termB.coef * termB.coef;
      const bSqPow = termB.power * 2;

      // 2AB
      const twoABCoef = 2 * termA.coef * termB.coef;
      const twoABPow = termA.power + termB.power;

      // Format terms for display
      const formatTerm = (c: number, p: number) => {
          return <span>{c}{p > 0 && 'x'}{p > 1 && <sup className="text-lg">{p}</sup>}</span>;
      }
      
      const termADisplay = <span>{termA.coef > 1 && termA.coef}{termA.power > 0 && 'x'}{termA.power > 1 && <sup className="text-lg">{termA.power}</sup>}</span>;
      const termBDisplay = <span>{termB.coef > 1 && termB.coef}{termB.power > 0 && 'x'}{termB.power > 1 && <sup className="text-lg">{termB.power}</sup>}</span>;

      return (
          <div className="flex flex-col gap-8 items-center w-full">
              {/* Formula View */}
              <div className="text-3xl md:text-4xl font-mono text-white tracking-wide">
                  {idType === 'sum' && <span>({termADisplay} + {termBDisplay})<sup className="text-2xl">2</sup></span>}
                  {idType === 'diff' && <span>({termADisplay} - {termBDisplay})<sup className="text-2xl">2</sup></span>}
                  {idType === 'sumdiff' && <span>({termADisplay} + {termBDisplay})({termADisplay} - {termBDisplay})</span>}
              </div>

              <div className="text-gray-500 animate-bounce"><ArrowDown size={32} /></div>

              {/* Step by Step Expansion */}
              <div className="bg-space-900/80 p-6 rounded-2xl border border-white/10 w-full text-center font-mono text-xl md:text-2xl text-gray-300 leading-loose shadow-inner">
                   {idType === 'sum' && (
                       <div>
                           <span className="text-neon-cyan inline-block p-1">({termADisplay})<sup className="text-base">2</sup></span> + 
                           <span className="text-neon-purple inline-block p-1"> 2·({termADisplay})·({termBDisplay}) </span> + 
                           <span className="text-neon-pink inline-block p-1">({termBDisplay})<sup className="text-base">2</sup></span>
                       </div>
                   )}
                   {idType === 'diff' && (
                       <div>
                           <span className="text-neon-cyan inline-block p-1">({termADisplay})<sup className="text-base">2</sup></span> - 
                           <span className="text-neon-purple inline-block p-1"> 2·({termADisplay})·({termBDisplay}) </span> + 
                           <span className="text-neon-pink inline-block p-1">({termBDisplay})<sup className="text-base">2</sup></span>
                       </div>
                   )}
                   {idType === 'sumdiff' && (
                       <div>
                           <span className="text-neon-cyan inline-block p-1">({termADisplay})<sup className="text-base">2</sup></span> - 
                           <span className="text-neon-pink inline-block p-1">({termBDisplay})<sup className="text-base">2</sup></span>
                       </div>
                   )}
              </div>
              
              <div className="text-gray-500"><ArrowDown size={32} /></div>

              <div className="text-2xl md:text-4xl font-bold text-white bg-gradient-to-r from-space-800 to-space-700 border border-white/20 px-10 py-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-all hover:scale-105">
                   {formatTerm(aSqCoef, aSqPow)} 
                   {idType === 'sum' && <span> + {formatTerm(twoABCoef, twoABPow)}</span>}
                   {idType === 'diff' && <span> - {formatTerm(twoABCoef, twoABPow)}</span>}
                   {idType === 'sumdiff' ? ' - ' : ' + '}
                   {formatTerm(bSqCoef, bSqPow)}
              </div>
          </div>
      );
  };

  // --- Ruffini Practice Logic ---
  const initPractice = () => {
    // Pick one of the 30 datasets
    const datasetIndex = Math.floor(Math.random() * PRACTICE_DATASETS.length);
    const roots = PRACTICE_DATASETS[datasetIndex];
    
    // Construct polynomial from roots: (x-r1)(x-r2)(x-r3)
    const a = 1;
    const b = -(roots[0] + roots[1] + roots[2]);
    const c = (roots[0]*roots[1] + roots[0]*roots[2] + roots[1]*roots[2]);
    const d = -(roots[0]*roots[1]*roots[2]);

    setPracticePoly([a, b, c, d]);
    setPracticeRootGuess('');
    setTableState('input_root');
    setPracticeFeedback('none');
    setUserTable({rowMul: Array(4).fill(''), rowAdd: Array(4).fill('')});
  };

  const startPracticeTable = () => {
      if(!practiceRootGuess) return;
      setTableState('filling');
      setPracticeFeedback('none');
      // Pre-fill input fields with empty strings
      const len = practicePoly.length;
      setUserTable({
          rowMul: Array(len).fill(''),
          rowAdd: Array(len).fill('')
      });
  };

  const checkPracticeTable = () => {
      const root = parseInt(practiceRootGuess);
      const coeffs = practicePoly;
      
      const rowMul = userTable.rowMul.map(v => parseInt(v));
      const rowAdd = userTable.rowAdd.map(v => parseInt(v));

      const isMulComplete = rowMul.slice(1).every(n => !isNaN(n));
      const isAddComplete = rowAdd.every(n => !isNaN(n));

      if (!isMulComplete || !isAddComplete) {
          setPracticeFeedback('math_error');
          return;
      }

      // 1. Check Arithmetic
      let mathCorrect = true;
      if (rowAdd[0] !== coeffs[0]) mathCorrect = false; // First drop must match

      for (let i = 1; i < coeffs.length; i++) {
          if (rowMul[i] !== rowAdd[i-1] * root) mathCorrect = false;
          if (rowAdd[i] !== coeffs[i] + rowMul[i]) mathCorrect = false;
      }

      if (!mathCorrect) {
          setPracticeFeedback('math_error');
          return;
      }

      // 2. Check Remainder
      const remainder = rowAdd[rowAdd.length - 1];
      if (remainder === 0) {
          setPracticeFeedback('correct');
      } else {
          setPracticeFeedback('bad_root');
      }
  };


  // --- Factorizer Logic with Visualization ---
  const renderRuffiniTable = (coeffs: number[], root: number, nextCoeffs: number[]) => {
      const calcRow = coeffs.map((_, i) => i === 0 ? 0 : (nextCoeffs[i-1] * root));
      return (
          // Responsive font size: text-sm on mobile, text-xl on desktop
          <div className="font-mono text-sm md:text-xl overflow-x-auto">
              <div className="grid grid-cols-[auto_1fr] gap-x-6 border-l-2 border-white pl-4">
                  <div className="text-right py-2 border-b border-white/20"></div>
                  <div className="flex justify-around py-2 border-b border-white/20">
                      {coeffs.map((c, i) => <span key={i} className="w-14 text-center">{c}</span>)}
                  </div>
                  
                  <div className="text-right py-2 font-bold text-neon-cyan pr-4">{root}</div>
                  <div className="flex justify-around py-2 text-gray-400">
                      <span className="w-14 text-center">↓</span>
                      {calcRow.slice(1).map((c, i) => <span key={i} className="w-14 text-center">{c}</span>)}
                  </div>
                  
                  <div className="text-right py-2 border-t-2 border-white"></div>
                  <div className="flex justify-around py-2 border-t-2 border-white font-bold">
                       {nextCoeffs.map((c, i) => <span key={i} className="w-14 text-center text-white">{c}</span>)}
                       <span className="w-14 text-center text-neon-cyan">0</span>
                  </div>
              </div>
          </div>
      );
  };

  const solvePolynomial = () => {
    const coeffs = [coeffsInput.a, coeffsInput.b, coeffsInput.c, coeffsInput.d, coeffsInput.e];
    while(coeffs.length > 0 && coeffs[0] === 0) coeffs.shift();
    if (coeffs.length === 0) return;

    const newSteps: Step[] = [];
    let currentCoeffs = [...coeffs];
    let factors: string[] = [];

    // 1. Common Factor
    let commonFactorX = 0;
    while (currentCoeffs.length > 0 && currentCoeffs[currentCoeffs.length - 1] === 0) {
        commonFactorX++;
        currentCoeffs.pop();
    }
    if (commonFactorX > 0) {
        const factorStr = commonFactorX === 1 ? "x" : <span>x<sup>{commonFactorX}</sup></span>;
        newSteps.push({
            title: t.polynomials.steps.common_factor,
            desc: `Gai independentea 0 da. ${commonFactorX === 1 ? 'x' : `x^${commonFactorX}`} ateratzen dugu.`,
            math: <div className="text-2xl font-mono text-neon-cyan"><PolyDisplay coeffs={coeffs}/> = {factorStr} · (<PolyDisplay coeffs={currentCoeffs}/>)</div>,
            badge: "Step 1"
        });
        for(let i=0; i<commonFactorX; i++) factors.push("x");
    }

    // 2. Ruffini Loop
    let degree = currentCoeffs.length - 1;
    while (degree > 2) {
        let termIndep = currentCoeffs[currentCoeffs.length - 1];
        let divisors = getDivisors(termIndep);
        let found = false;
        
        for (let div of divisors) {
            let newCoeffsArr: number[] = [];
            let val = currentCoeffs[0];
            newCoeffsArr.push(val);
            for (let i = 1; i < currentCoeffs.length; i++) {
                let res = val * div;
                val = currentCoeffs[i] + res;
                if (i < currentCoeffs.length - 1) newCoeffsArr.push(val);
            }
            if (val === 0) { // Remainder 0
                const table = renderRuffiniTable(currentCoeffs, div, newCoeffsArr);
                newSteps.push({
                    title: t.polynomials.steps.ruffini,
                    desc: `Probatu erroa: ${div}`,
                    math: table,
                    badge: `Degree ${degree} → ${degree-1}`
                });
                const sign = div >= 0 ? '-' : '+';
                factors.push(`(x ${sign} ${Math.abs(div)})`);
                currentCoeffs = newCoeffsArr;
                degree--;
                found = true;
                break;
            }
        }
        if (!found) break;
    }

    // 3. Quadratic
    if (degree === 2) {
        let a = currentCoeffs[0], b = currentCoeffs[1], c = currentCoeffs[2];
        let discrim = (b * b) - (4 * a * c);
        
        if (discrim >= 0) {
            let r1 = (-b + Math.sqrt(discrim)) / (2 * a);
            let r2 = (-b - Math.sqrt(discrim)) / (2 * a);
            const f1 = Number.isInteger(r1) ? r1 : r1.toFixed(2);
            const f2 = Number.isInteger(r2) ? r2 : r2.toFixed(2);

            newSteps.push({
                title: t.polynomials.steps.quadratic,
                desc: `Formula aplikatzen dugu:`,
                math: (
                    <div className="flex flex-col gap-4 text-center">
                        <div className="font-mono text-xl"><PolyDisplay coeffs={currentCoeffs}/> = 0</div>
                        <div className="text-neon-pink font-bold border p-4 rounded border-neon-pink/30 bg-neon-pink/10 text-xl">
                            x₁ = {f1}, x₂ = {f2}
                        </div>
                    </div>
                ),
                badge: "Roots"
            });
            factors.push(`(x ${r1>=0?'-':'+'} ${Math.abs(Number(f1))})`);
            factors.push(`(x ${r2>=0?'-':'+'} ${Math.abs(Number(f2))})`);
        } else {
             newSteps.push({
                title: t.polynomials.steps.quadratic,
                desc: t.polynomials.steps.no_real_roots,
                math: <div className="text-red-400 font-bold text-xl">Δ = {discrim} &lt; 0</div>,
                badge: "Stop"
            });
            factors.push(`(${currentCoeffs.map((c,i) => {
                let p = currentCoeffs.length-1-i;
                return c + (p>0?'x':'') + (p>1?'^'+p:''); // Basic text fallback for complexity
            }).join('+').replace(/\+\-/g, '-')})`); 
        }
    } else if (degree > 2) {
         // Did not finish
    }

    // Final Display
    newSteps.push({
        title: t.polynomials.steps.result,
        desc: "Faktorizazio osoa:",
        math: (
            <div className="text-4xl text-neon-cyan font-mono font-bold glow-text p-6 text-center">
                {coeffsInput.a !== 1 && coeffsInput.a}
                {factors.map((f, i) => <span key={i}>{f}</span>)}
            </div>
        ),
        badge: "Final"
    });

    setFactorSteps(newSteps);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="flex justify-between items-center">
             <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{t.polynomials.title}</h2>
             <div className="flex bg-space-800 p-1 rounded-xl border border-white/10">
                 {(['identities', 'ruffini', 'factorizer'] as const).map(tab => (
                     <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-neon-blue text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                     >
                         {t.polynomials.tabs[tab]}
                     </button>
                 ))}
             </div>
        </div>

        {activeTab === 'identities' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-panel p-8 rounded-3xl col-span-1 flex flex-col gap-8 bg-space-800/80 border-2 border-white/5">
                     <h3 className="font-bold text-2xl text-white flex items-center gap-3">
                        <Sigma className="text-neon-purple" size={28}/> {t.polynomials.identities_tools.calc}
                     </h3>
                     
                     <div className="space-y-6">
                         <div className="bg-space-900 p-6 rounded-2xl border border-white/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
                             <label className="text-xs text-neon-cyan font-bold uppercase mb-3 block tracking-wider flex items-center gap-2">
                                <Box size={14} /> {t.polynomials.identities_tools.term_a}
                             </label>
                             <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5 shadow-inner">
                                 <input type="number" value={termA.coef} onChange={(e) => setTermA({...termA, coef: parseInt(e.target.value)})} className="w-20 bg-transparent border-b-2 border-white/20 focus:border-neon-cyan text-center text-white text-2xl outline-none font-mono transition-colors"/>
                                 <span className="font-mono text-2xl text-gray-500">x</span>
                                 <sup className="flex items-center"><input type="number" value={termA.power} onChange={(e) => setTermA({...termA, power: parseInt(e.target.value)})} className="w-10 bg-transparent border-b border-white/20 focus:border-neon-cyan text-center text-sm text-white outline-none transition-colors"/></sup>
                             </div>
                         </div>
                         <div className="bg-space-900 p-6 rounded-2xl border border-white/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
                             <label className="text-xs text-neon-pink font-bold uppercase mb-3 block tracking-wider flex items-center gap-2">
                                <Box size={14} /> {t.polynomials.identities_tools.term_b}
                             </label>
                             <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5 shadow-inner">
                                 <input type="number" value={termB.coef} onChange={(e) => setTermB({...termB, coef: parseInt(e.target.value)})} className="w-20 bg-transparent border-b-2 border-white/20 focus:border-neon-pink text-center text-white text-2xl outline-none font-mono transition-colors"/>
                                 <span className="font-mono text-2xl text-gray-500">x</span>
                                 <sup className="flex items-center"><input type="number" value={termB.power} onChange={(e) => setTermB({...termB, power: parseInt(e.target.value)})} className="w-10 bg-transparent border-b border-white/20 focus:border-neon-pink text-center text-sm text-white outline-none transition-colors"/></sup>
                             </div>
                         </div>
                     </div>

                     <div className="flex flex-col gap-4">
                         <button onClick={() => setIdType('sum')} className={`group w-full py-4 rounded-xl border-b-4 font-mono font-bold text-xl transition-all active:translate-y-1 active:border-b-0 flex items-center justify-center gap-3 ${idType==='sum' ? 'bg-neon-cyan text-space-900 border-neon-cyan/50 shadow-[0_5px_15px_rgba(0,206,201,0.3)]' : 'bg-space-700 border-space-900 text-gray-400 hover:bg-space-600 hover:text-white'}`}>
                            <Plus size={24} className={idType==='sum' ? 'text-space-900' : 'text-gray-500'} /> (A + B)²
                         </button>
                         <button onClick={() => setIdType('diff')} className={`group w-full py-4 rounded-xl border-b-4 font-mono font-bold text-xl transition-all active:translate-y-1 active:border-b-0 flex items-center justify-center gap-3 ${idType==='diff' ? 'bg-neon-pink text-space-900 border-neon-pink/50 shadow-[0_5px_15px_rgba(253,121,168,0.3)]' : 'bg-space-700 border-space-900 text-gray-400 hover:bg-space-600 hover:text-white'}`}>
                            <Minus size={24} className={idType==='diff' ? 'text-space-900' : 'text-gray-500'} /> (A - B)²
                         </button>
                         <button onClick={() => setIdType('sumdiff')} className={`group w-full py-4 rounded-xl border-b-4 font-mono font-bold text-xl transition-all active:translate-y-1 active:border-b-0 flex items-center justify-center gap-3 ${idType==='sumdiff' ? 'bg-neon-purple text-white border-neon-purple/50 shadow-[0_5px_15px_rgba(176,38,255,0.3)]' : 'bg-space-700 border-space-900 text-gray-400 hover:bg-space-600 hover:text-white'}`}>
                             <X size={24} className={idType==='sumdiff' ? 'text-white' : 'text-gray-500'} /> (A+B)(A-B)
                         </button>
                     </div>
                </div>

                <div className="glass-panel p-10 rounded-3xl col-span-1 md:col-span-2 flex items-center justify-center relative border border-white/10 bg-gradient-to-br from-space-900 to-space-800 shadow-2xl">
                    <div className="absolute top-6 right-6 text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
                        {t.polynomials.identities_tools.step_by_step} <ChevronRight size={14} />
                    </div>
                    {renderIdentityMath()}
                </div>
            </div>
        )}

        {activeTab === 'ruffini' && (
             <div className="glass-panel p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                <div className="flex gap-4 mb-10 justify-center">
                     <button onClick={() => setRuffiniMode('example')} className={`px-8 py-3 rounded-full text-base font-bold border transition-all ${ruffiniMode === 'example' ? 'bg-white/10 border-neon-cyan text-neon-cyan' : 'border-transparent text-gray-500'}`}>
                         <BookOpen size={20} className="inline mr-2"/> {t.polynomials.ruffini.mode_example}
                     </button>
                     <button onClick={() => { setRuffiniMode('practice'); initPractice(); }} className={`px-8 py-3 rounded-full text-base font-bold border transition-all ${ruffiniMode === 'practice' ? 'bg-white/10 border-neon-pink text-neon-pink' : 'border-transparent text-gray-500'}`}>
                         <Gamepad2 size={20} className="inline mr-2"/> {t.polynomials.ruffini.mode_practice}
                     </button>
                </div>

                {ruffiniMode === 'example' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                         <div className="space-y-8">
                             <div className="bg-space-900 p-8 rounded-2xl border border-white/10">
                                 <div className="text-gray-400 text-sm mb-3 uppercase tracking-wide">Polynomial</div>
                                 <div className="text-3xl font-mono text-white">x³ - 2x² - 5x + 6</div>
                                 <div className="text-gray-500 text-sm mt-2">Roots: 1, -2, 3</div>
                             </div>
                             
                             <div className="space-y-6">
                                 <div className="flex gap-5 items-start">
                                     <div className="bg-neon-cyan text-space-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0">1</div>
                                     {/* Responsive text size for steps: text-sm on mobile, text-lg on desktop */}
                                     <p className="text-gray-300 text-sm md:text-lg leading-relaxed">{t.polynomials.ruffini.example_step1}</p>
                                 </div>
                                 <div className="flex gap-5 items-start">
                                     <div className="bg-neon-pink text-space-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0">2</div>
                                     <p className="text-gray-300 text-sm md:text-lg leading-relaxed">{t.polynomials.ruffini.example_step2}</p>
                                 </div>
                                 <div className="flex gap-5 items-start">
                                     <div className="bg-neon-purple text-space-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0">3</div>
                                     <p className="text-gray-300 text-sm md:text-lg leading-relaxed">{t.polynomials.ruffini.example_step3}</p>
                                 </div>
                             </div>
                         </div>

                         {/* Responsive text size for table: text-sm on mobile, text-xl on desktop */}
                         <div className="bg-black/30 p-10 rounded-2xl border border-white/5 font-mono text-sm md:text-xl flex justify-center">
                             <div className="grid grid-cols-[auto_1fr] gap-x-8 border-l-4 border-white pl-6">
                                  {/* Row 1 */}
                                  <div></div>
                                  <div className="flex justify-around w-80 border-b-2 border-white/20 pb-3 mb-3">
                                      <span className="w-16 text-center font-bold">1</span>
                                      <span className="w-16 text-center">-2</span>
                                      <span className="w-16 text-center">-5</span>
                                      <span className="w-16 text-center">6</span>
                                  </div>

                                  {/* Row 2 */}
                                  <div className="font-bold text-neon-cyan pt-3 text-right pr-6">1</div>
                                  <div className="flex justify-around w-80 pt-3 text-gray-400">
                                      <span className="w-16 text-center">↓</span>
                                      <span className="w-16 text-center text-neon-cyan">1</span>
                                      <span className="w-16 text-center text-neon-cyan">-1</span>
                                      <span className="w-16 text-center text-neon-cyan">-6</span>
                                  </div>

                                  {/* Row 3 */}
                                  <div className="border-t-4 border-white mt-3"></div>
                                  <div className="flex justify-around w-80 border-t-4 border-white pt-3 mt-3 font-bold">
                                      <span className="w-16 text-center text-white">1</span>
                                      <span className="w-16 text-center text-white">-1</span>
                                      <span className="w-16 text-center text-white">-6</span>
                                      <span className="w-16 text-center text-neon-pink bg-neon-pink/20 rounded-lg">0</span>
                                  </div>
                             </div>
                         </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-neon-pink mb-3">{t.polynomials.ruffini.practice_title}</h3>
                        <p className="text-gray-400 text-center mb-8 text-lg">{t.polynomials.ruffini.practice_desc}</p>
                        
                        <div className="bg-space-900 px-12 py-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-10">
                             {practicePoly.length > 0 ? (
                                <div className="text-4xl font-mono text-white tracking-wider">
                                    <PolyDisplay coeffs={practicePoly} />
                                </div>
                             ) : (
                                <button onClick={initPractice} className="text-neon-cyan underline text-xl">{t.polynomials.ruffini.new_poly}</button>
                             )}
                        </div>

                        {tableState === 'input_root' && (
                             <div className="flex gap-6 items-center bg-space-800 p-8 rounded-2xl border border-white/5 animate-in fade-in">
                                 <span className="text-gray-300 font-bold uppercase text-sm">{t.polynomials.ruffini.input_root}</span>
                                 <input 
                                     type="number" 
                                     value={practiceRootGuess} 
                                     onChange={(e) => setPracticeRootGuess(e.target.value)}
                                     placeholder="?"
                                     className="w-24 h-16 bg-white/5 border border-white/20 rounded-xl text-center text-3xl text-white font-mono focus:border-neon-pink outline-none"
                                 />
                                 <button 
                                     onClick={startPracticeTable}
                                     disabled={!practiceRootGuess}
                                     className="px-8 py-4 bg-neon-pink text-space-900 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50 text-lg"
                                 >
                                     {t.polynomials.ruffini.start_table} <ArrowRight size={22} />
                                 </button>
                             </div>
                        )}

                        {tableState === 'filling' && (
                             <div className="w-full overflow-x-auto animate-in zoom-in bg-black/20 p-10 rounded-3xl border border-white/5">
                                <div className="grid grid-cols-[auto_1fr] gap-x-8 border-l-4 border-white pl-6 font-mono text-xl">
                                     {/* Row 1: Coeffs */}
                                    <div className="text-right py-4 border-b border-white/20"></div>
                                    <div className="flex justify-around py-4 border-b border-white/20 gap-4">
                                        {practicePoly.map((c, i) => <span key={i} className="w-20 text-center font-bold text-gray-300">{c}</span>)}
                                    </div>
                                    
                                    {/* Row 2: Inputs for Multiplications */}
                                    <div className="text-right py-4 font-bold text-neon-cyan pr-6 flex items-center justify-end text-2xl">{practiceRootGuess}</div>
                                    <div className="flex justify-around py-4 items-center gap-4">
                                        <span className="w-20 text-center text-gray-600">↓</span>
                                        {userTable.rowMul.slice(1).map((val, i) => (
                                            <input 
                                                key={i} 
                                                type="number" 
                                                value={val}
                                                onChange={(e) => {
                                                    const newMul = [...userTable.rowMul];
                                                    newMul[i+1] = e.target.value;
                                                    setUserTable({...userTable, rowMul: newMul});
                                                }}
                                                className="w-20 h-14 bg-white/5 border border-white/20 rounded-lg text-center text-white text-lg focus:border-neon-cyan outline-none transition-all focus:bg-white/10"
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Row 3: Inputs for Addition */}
                                    <div className="text-right py-4 border-t-4 border-white"></div>
                                    <div className="flex justify-around py-4 border-t-4 border-white pt-8 gap-4">
                                         {userTable.rowAdd.map((val, i) => (
                                             <div key={i} className="relative">
                                                <input 
                                                    type="number" 
                                                    value={val}
                                                    onChange={(e) => {
                                                        const newAdd = [...userTable.rowAdd];
                                                        newAdd[i] = e.target.value;
                                                        setUserTable({...userTable, rowAdd: newAdd});
                                                    }}
                                                    className={`w-20 h-14 bg-white/5 border border-white/20 rounded-lg text-center text-white font-bold text-lg focus:border-neon-pink outline-none transition-all focus:bg-white/10
                                                        ${i === userTable.rowAdd.length - 1 ? 'border-neon-pink/50 bg-neon-pink/10' : ''}
                                                    `}
                                                />
                                             </div>
                                         ))}
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col items-center gap-6">
                                     <button onClick={checkPracticeTable} className="px-12 py-4 bg-neon-cyan text-space-900 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,206,201,0.4)]">
                                         {t.polynomials.ruffini.check_btn}
                                     </button>

                                     {practiceFeedback === 'correct' && (
                                         <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom">
                                             <div className="text-green-400 font-bold flex items-center gap-3 text-2xl"><CheckCircle2 size={32}/> {t.polynomials.ruffini.feedback.success}</div>
                                             <button onClick={initPractice} className="text-base underline text-gray-400 hover:text-white flex items-center gap-2"><RefreshCw size={18}/> {t.polynomials.ruffini.new_poly}</button>
                                         </div>
                                     )}
                                     {practiceFeedback === 'math_error' && <div className="text-red-400 font-bold flex items-center gap-2 animate-shake text-lg"><XCircle/> {t.polynomials.ruffini.feedback.math_error}</div>}
                                     {practiceFeedback === 'bad_root' && (
                                         <div className="flex flex-col items-center gap-2 text-yellow-400 font-bold animate-in fade-in">
                                             <span className="text-lg">{t.polynomials.ruffini.feedback.bad_root}</span>
                                             <button onClick={() => setTableState('input_root')} className="px-6 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 text-base mt-2">Try Different Root</button>
                                         </div>
                                     )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )}

        {activeTab === 'factorizer' && (
             <div className="flex flex-col gap-8 animate-in slide-in-from-right duration-300">
                <div className="glass-panel p-8 rounded-3xl flex flex-wrap gap-6 items-center justify-center border-b-4 border-neon-cyan">
                    {/* Input Fields */}
                    {['a', 'b', 'c', 'd', 'e'].map((k, i) => {
                        const power = 4 - i;
                        return (
                            <React.Fragment key={k}>
                                <div className="flex items-center gap-2 bg-space-900/50 p-3 rounded-xl border border-white/10">
                                    <input 
                                        type="number" 
                                        value={(coeffsInput as any)[k]} 
                                        onChange={e => setCoeffsInput({...coeffsInput, [k]: parseInt(e.target.value)})} 
                                        className="w-16 bg-transparent text-center text-white font-mono text-2xl outline-none border-b border-neon-cyan"
                                    />
                                    {power > 0 && <span className="font-mono text-gray-400 text-lg">x<sup>{power}</sup></span>}
                                </div>
                                {i < 4 && <span className="text-gray-500 text-xl">+</span>}
                            </React.Fragment>
                        )
                    })}
                    
                    <button onClick={solvePolynomial} className="ml-6 bg-neon-cyan text-space-900 font-bold px-8 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,206,201,0.4)] flex items-center gap-3 text-lg">
                        <Wand2 size={24} /> {t.polynomials.solve_btn}
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6" id="steps-start">
                    {factorSteps.map((step, idx) => (
                        <div key={idx} className="glass-panel p-8 rounded-2xl animate-in slide-in-from-bottom duration-500" style={{animationDelay: `${idx * 150}ms`}}>
                             <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-white flex items-center gap-3"><CheckCircle2 className="text-neon-cyan"/> {step.title}</h4>
                                <span className="text-xs bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">{step.badge}</span>
                             </div>
                             <p className="text-gray-400 mb-6">{step.desc}</p>
                             <div className="bg-black/30 p-6 rounded-xl border border-white/5 overflow-x-auto">
                                 {step.math}
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default Polynomials;
