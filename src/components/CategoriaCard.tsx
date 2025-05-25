import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface CategoriaCardProps {
  nombre: string;
  imagen: string;
}

const CategoriaCard: React.FC<CategoriaCardProps> = ({ nombre, imagen }) => {
  return (
    <CardLink to={`/categoria/${encodeURIComponent(nombre)}`}>
      <Card>
        <CardAvatar style={{ backgroundImage: `url(${imagen})` }}>
          {[...Array(12)].map((_, i) => (
            <Spark key={i} index={i} />
          ))}
        </CardAvatar>
        <CardTitle>{nombre}</CardTitle>
      </Card>
    </CardLink>
  );
};

export default CategoriaCard;

// 🔄 Keyframes de movimiento
const motions = [
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(8px,-4px);}100%{transform:translate(0,0);}`,
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(-8px,4px);}100%{transform:translate(0,0);}`,
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(4px,8px);}100%{transform:translate(0,0);}`,
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(-4px,-8px);}100%{transform:translate(0,0);}`,
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(6px,6px);}100%{transform:translate(0,0);}`
];

// ✨ Parpadeo de chispa
const flicker = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

// 📦 Estilos
const Card = styled.div`
  width: 240px;
  height: 200px;
  background: #f5f5f5;
  padding: 0 12px;
  border-radius: 12px;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CardAvatar = styled.div`
  --size: 120px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease;
  position: relative;
  overflow: hidden;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.div`
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
`;

// 🟡 Partícula amarilla (sprinkle)
const Spark = styled.span<{ index: number }>`
  position: absolute;
  width: 3px;
  height: 3px;
  background: #FFD700;
  border-radius: 50%;
  top: ${() => Math.random() * 90 + 5}%;
  left: ${() => Math.random() * 90 + 5}%;
  pointer-events: none;
  opacity: 0;

  ${Card}:hover & {
    opacity: 1;
    animation: 
      ${({ index }) => motions[index % motions.length]} 4s infinite ease-in-out,
      ${flicker} 2.5s infinite ease-in-out;
    animation-delay: ${({ index }) => index * 0.15}s;
  }
`;
