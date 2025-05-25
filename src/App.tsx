import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecetasGrid from './components/RecetasGrid';
import CategoriasGrid from './components/CategoriasGrid';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriasGrid />} />
      <Route path="/categoria/:nombre" element={<RecetasGrid />} />
    </Routes>
  );
};

export default App;
