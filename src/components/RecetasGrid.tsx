import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import RecetaCard from './RecetaCard';
import { useParams } from 'react-router-dom';

interface Receta {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RecetasGrid: React.FC = () => {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { nombre } = useParams();
  const categoria = decodeURIComponent(nombre || '');
  const [pagina, setPagina] = useState(1);
  const porPagina = 16;

  useEffect(() => {
    setPagina(1);
    setRecetas([]);
    setLoading(true);
    setError(null);

    if (!categoria) {
      setError('No se especificó una categoría.');
      setLoading(false);
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
      .then(res => res.json())
      .then(data => {
        if (!data.meals) {
          setError('No hay recetas para esta categoría.');
          setRecetas([]);
        } else {
          setRecetas(data.meals);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar las recetas.');
        setLoading(false);
      });
  }, [categoria]);

  const totalPaginas = Math.ceil(recetas.length / porPagina);
  const recetasMostradas = recetas.slice((pagina - 1) * porPagina, pagina * porPagina);

  return (
    <Container>
      <Heading>{categoria || 'Categoría desconocida'}</Heading>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Grid>
        {loading
          ? Array.from({ length: porPagina }).map((_, i) => <SkeletonCard key={i} />)
          : recetasMostradas.map(receta => (
              <RecetaCard
                key={receta.idMeal}
                nombre={receta.strMeal}
                imagen={receta.strMealThumb}
                id={receta.idMeal}
              />
            ))}
      </Grid>

      {!loading && !error && totalPaginas > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setPagina(p => Math.max(p - 1, 1))}
            disabled={pagina === 1}
            $left
            $disabled={pagina === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="22" width="22">
              <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
              <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
            </svg>
            <span>Anterior</span>
          </PageButton>

          <PageButton
            onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
            disabled={pagina === totalPaginas}
            $disabled={pagina === totalPaginas}
          >
            <span>Siguiente</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="22" width="22">
              <path d="M800 544H160a32 32 0 0 1 0-64h640a32 32 0 0 1 0 64z" />
              <path d="M786.752 512 521.344 246.656a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 0 1-45.312-45.312L786.752 512z" />
            </svg>
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
};

export default RecetasGrid;

// Estilos
const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonCard = styled.div`
  width: 240px;
  height: 200px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

const Container = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ $left?: boolean; $disabled?: boolean }>`
  position: relative;
  width: 180px;
  height: 56px;
  border-radius: 16px;
  background-color: white;
  color: black;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  overflow: hidden;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;
  z-index: 0;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: ${({ $left }) => ($left ? '4px' : 'unset')};
    right: ${({ $left }) => ($left ? 'unset' : '4px')};
    width: ${({ $disabled }) => ($disabled ? '48px' : '48px')};
    height: 48px;
    background-color: ${({ $disabled }) => ($disabled ? '#ccc' : '#d1d1d1')};
    border-radius: 14px;
    transition: width 0.5s ease;
    z-index: 1;
  }

  &:hover::before {
    width: ${({ $disabled }) => ($disabled ? '48px' : '172px')};
  }

  svg {
    position: absolute;
    top: 50%;
    ${({ $left }) => ($left ? 'left: 12px;' : 'right: 12px;')}
    transform: translateY(-50%);
    z-index: 2;
    fill: ${({ $disabled }) => ($disabled ? '#777' : 'black')};
    transition: transform 0.3s ease;
  }

  span {
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
    color: ${({ $disabled }) => ($disabled ? '#777' : 'black')};
  }

  &:hover span {
    transform: ${({ $disabled, $left }) =>
      $disabled ? 'none' : $left ? 'translateX(10px)' : 'translateX(-10px)'};
  }
`;
