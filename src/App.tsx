import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriasGrid from './components/CategoriasGrid';
import RecetasGrid from './components/RecetasGrid';
import styled from 'styled-components';

const App: React.FC = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<CategoriasGrid />} />
        <Route path="/categoria/:nombre" element={<RecetasGrid />} />
      </Routes>
    </Main>
  );
};

export default App;

// Estilos
const Main = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;
