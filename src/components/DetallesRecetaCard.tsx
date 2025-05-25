import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

interface DetallesRecetaCardProps {
  nombre: string;
  imagen: string;
  categoria: string;
  ingredientes: string[];
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
          <CategoriaLink to={`/categoria/${categoria}`}>{categoria}</CategoriaLink>
        </LeftColumn>
        <RightColumn>
          <ScrollWrapper>
            <GradientTop />
            <IngredientList>
              {ingredientes.map((item, i) => (
                <li key={i}>{item}</li>
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
  height: auto;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1), -10px -10px 30px rgba(255, 255, 255, 0.7);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: rotateY(90deg);

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
  font-family: 'Patrick Hand', cursive;
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
  display: inline-block;
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
  font-size: 1.3rem;
  text-align: left;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Patrick Hand', cursive;
  position: relative;
  z-index: 0;

  li {
    margin-bottom: 1rem;
    padding-left: 1rem;
    position: relative;
    transition: background 0.3s ease, transform 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
      border-radius: 6px;
      transform: scale(1.03);
      box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.05);
    }
  }
`;
