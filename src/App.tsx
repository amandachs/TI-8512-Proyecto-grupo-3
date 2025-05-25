// src/App.tsx
import React from 'react';
import CategoriaCard from './components/CategoriaCard';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #fafafa;
  min-height: 100vh;
`;


function App() {
  return (
      <CategoriaCard
        nombre="Beef"
        imagen="https://www.themealdb.com/images/category/chicken.png"
      />
  );
}

export default App;
