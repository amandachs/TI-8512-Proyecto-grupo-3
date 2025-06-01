import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CategoriaCard from './CategoriaCard';
import BackButton from './BackButton';
import { useLocation } from 'react-router-dom';

interface Categoria {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

const CategoriasGrid: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => {
        const ordenadas = data.categories.sort((a: Categoria, b: Categoria) =>
          a.strCategory.localeCompare(b.strCategory)
        );
        setCategorias(ordenadas);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar categorías');
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      {location.pathname !== '/' && <BackButton />}
      <Grid>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : categorias.map(categoria => (
              <CategoriaCard
                key={categoria.idCategory}
                nombre={categoria.strCategory}
                imagen={categoria.strCategoryThumb}
              />
            ))}
      </Grid>
    </Container>
  );
};

export default CategoriasGrid;

// Estilos

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonCard = styled.div`
  width: 240px;
  height: 200px;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  justify-items: center;
`;

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;
