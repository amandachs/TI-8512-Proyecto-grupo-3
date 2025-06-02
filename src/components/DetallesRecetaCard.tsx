import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

interface Ingrediente {
  nombre: string;
  cantidad: string;
}

interface DetallesRecetaCardProps {
  nombre: string;
  imagen: string;
  categoria: string;
  ingredientes: Ingrediente[];
}

const DetallesRecetaCard: React.FC<DetallesRecetaCardProps> = ({ nombre, imagen, categoria, ingredientes }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledWrapper>
      <CardContainer className={loaded ? 'open' : ''}>
        <LeftColumn>
          <Avatar src={imagen} alt={nombre} />
          <Title>{nombre}</Title>
        </LeftColumn>
        <RightColumn>
          <ScrollWrapper>
            <GradientTop />
            <IngredientList>
              {ingredientes.map((item, i) => (
                <li key={i}>
                  <IngredienteNombre>{item.nombre}</IngredienteNombre>
                  <IngredienteCantidad>{item.cantidad}</IngredienteCantidad>
                </li>
              ))}
            </IngredientList>
            <GradientBottom />
          </ScrollWrapper>
        </RightColumn>
      </CardContainer>
    </StyledWrapper>
  );
};

export default DetallesRecetaCard;

// Animación
const bookOpen = keyframes`
  0% {
    transform: rotateY(90deg) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: rotateY(0deg) scale(1);
    opacity: 1;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(to right, #f3f4f6, #e0e0e0);
`;

const CardContainer = styled.div`
  width: 1000px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1), -10px -10px 30px rgba(255, 255, 255, 0.7);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  opacity: 0;
  transform: rotateY(90deg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &.open {
    animation: ${bookOpen} 0.8s ease forwards;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

const LeftColumn = styled.div`
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RightColumn = styled.div`
  width: 50%;
  padding: 2rem;
  background: #fdfcf8;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
  border-left: 2px dashed #ccc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
`;

const Avatar = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const CategoriaLink = styled(Link)`
  font-size: 1.2rem;
  color: #0077cc;
  text-decoration: none;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ScrollWrapper = styled.div`
  position: relative;
  max-height: 600px;
  overflow-y: auto;
`;

const GradientTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 100%;
  background: linear-gradient(to bottom, #ffffff, transparent);
  pointer-events: none;
  z-index: 1;
`;

const GradientBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;
  background: linear-gradient(to top, #ffffff, transparent);
  pointer-events: none;
  z-index: 1;
`;

const IngredientList = styled.ul`
  list-style: none;
  padding: 1.5rem;
  margin: 0 auto;
  font-size: 1.2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;

  li {
    margin-bottom: 1.2rem;
    padding: 0.5rem 1rem;
    border-left: 3px solid #e2e8f0;
    transition: background 0.2s ease;
    cursor: default;

    &:hover {
      background-color: #f9f9f9;
    }
  }
`;

const IngredienteNombre = styled.div`
  font-weight: 600;
  color: #222;
  margin-bottom: 0.2rem;
`;

const IngredienteCantidad = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  font-weight: 400;
`;
