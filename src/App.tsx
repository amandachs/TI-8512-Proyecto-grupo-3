import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriasGrid from './components/CategoriasGrid';
import RecetasGrid from './components/RecetasGrid';
import DetalleReceta from './pages/DetalleReceta';
import styled from 'styled-components';
import Navbar from './components/NavBar';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <>
      <HeaderContainer>
        <Navbar />
        <SearchBar />
      </HeaderContainer>
      <Main>
        <Routes>
          <Route path="/" element={<CategoriasGrid />} />
          <Route path="/categoria/:nombre" element={<RecetasGrid />} />
          <Route path="/detalle/:id" element={<DetalleReceta />} />
          <Route path="/x3" element={<HomePage />} />
        </Routes>
      </Main>
    </>
  );
};

export default App;

// Estilos
const HeaderContainer = styled.header`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Main = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;