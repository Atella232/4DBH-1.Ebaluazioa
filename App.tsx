
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Rationalization from './pages/Rationalization';
import Polynomials from './pages/Polynomials';
import Logarithms from './pages/Logarithms';
import TheoryHub from './pages/TheoryHub';
import PracticeHub from './pages/PracticeHub';
import Exams from './pages/Exams';
import { Language, content } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('eu');
  const t = content[lang];

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout lang={lang} setLang={setLang} />}>
          <Route index element={<Home t={t} />} />
          <Route path="theory" element={<TheoryHub t={t} />} />
          <Route path="practice" element={<PracticeHub t={t} />} />
          <Route path="exams" element={<Exams t={t} />} />
          <Route path="rationalization" element={<Rationalization t={t} />} />
          <Route path="polynomials" element={<Polynomials t={t} />} />
          <Route path="logarithms" element={<Logarithms t={t} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
