
import React from 'react';

// Fraction Component: Numerator over Denominator with a horizontal bar
export const MathFrac: React.FC<{ num: React.ReactNode; den: React.ReactNode; className?: string }> = ({ num, den, className = "" }) => (
    <span className={`inline-flex flex-col items-center align-middle mx-1 ${className}`} style={{ verticalAlign: '-0.5em' }}>
        <span className="border-b-2 border-current px-1 pb-[1px] mb-[1px] w-full text-center leading-tight">{num}</span>
        <span className="w-full text-center pt-[1px] leading-tight">{den}</span>
    </span>
);

// Root Component: Radical symbol connected to a top border (vinculum)
export const MathRoot: React.FC<{ idx?: React.ReactNode; content: React.ReactNode }> = ({ idx, content }) => (
    <span className="inline-flex items-baseline mx-0.5" style={{ verticalAlign: 'middle' }}>
        {/* Index for N-th roots */}
        {idx && <sup className="text-[0.6em] mr-[2px] relative -top-1">{idx}</sup>}
        
        {/* Radical Symbol SVG for better scaling */}
        <span className="inline-flex flex-col justify-end">
             <svg width="0.8em" height="1.1em" viewBox="0 0 10 16" preserveAspectRatio="none" style={{ marginBottom: '-0.1em' }}>
                 <path d="M4 8 L6 14 L10 2" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
             </svg>
        </span>

        {/* Content with Vinculum (Top Bar) */}
        <span className="border-t-2 border-current px-1 pb-[1px] self-end flex items-center" style={{ marginTop: '0.1em' }}>
            {content}
        </span>
    </span>
);

// Exponent/Superscript
export const MathSup: React.FC<{ base: React.ReactNode; exp: React.ReactNode }> = ({ base, exp }) => (
    <span className="inline-flex items-baseline">
        {base}
        <sup className="text-[0.6em] ml-[1px]">{exp}</sup>
    </span>
);

// Subscript
export const MathSub: React.FC<{ base: React.ReactNode; sub: React.ReactNode }> = ({ base, sub }) => (
    <span className="inline-flex items-baseline">
        {base}
        <sub className="text-[0.6em] ml-[1px]">{sub}</sub>
    </span>
);

// General Container for Formula
// Enforces Serif font (Times New Roman) for the "Textbook/LaTeX" look
// Responsive size: text-xl on mobile, text-3xl on md+ (tablet/desktop)
export const MathFormula: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    return (
        <span 
            className={`font-serif text-xl md:text-3xl tracking-wide inline-flex items-center flex-wrap gap-1 leading-loose ${className}`} 
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
            {children}
        </span>
    );
};
