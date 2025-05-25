// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";

const RecetaDetalle = () => (
  <div style={{ padding: '2rem', fontSize: '1.5rem', textAlign: 'center' }}>
    <p>Detalle de la receta (ruta simulada)</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchBar />} />
      <Route path="/detalle/:id" element={<RecetaDetalle />} />
    </Routes>
  );
}

export default App;
