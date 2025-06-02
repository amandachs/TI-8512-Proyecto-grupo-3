import React from 'react';
import styled from 'styled-components';

interface TituloProps {
  children: React.ReactNode;
}

const Titulo: React.FC<TituloProps> = ({ children }) => {
  return <StyledTitulo>{children}</StyledTitulo>;
};

export default Titulo;

const StyledTitulo = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  margin: 2rem 0;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #4b4b4b;
    transform: translateY(-2px);
  }
`;
