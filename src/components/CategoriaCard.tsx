import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface CategoriaCardProps {
  nombre: string;
  imagen: string;
}

const CategoriaCard: React.FC<CategoriaCardProps> = ({ nombre, imagen }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <CardLink to={`/categoria/${encodeURIComponent(nombre)}`}>
      <Card>
        <CardAvatarContainer>
          {!isLoaded && <SkeletonAvatar />}
          <CardAvatar style={{ backgroundImage: `url(${imagen})` }} $visible={isLoaded}>
            {/* Imagen invisible para disparar onLoad */}
            <img
              src={imagen}
              alt={nombre}
              style={{ display: 'none' }}
              onLoad={() => setIsLoaded(true)}
            />
            {[...Array(12)].map((_, i) => (
              <Spark key={i} index={i} />
            ))}
          </CardAvatar>
        </CardAvatarContainer>

        {!isLoaded ? <SkeletonTitle /> : <CardTitle>{nombre}</CardTitle>}
      </Card>
    </CardLink>
  );
};

export default CategoriaCard;

// Animaciones
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const flicker = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const motions = [
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(8px,-4px);}100%{transform:translate(0,0);}`,
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(-8px,4px);}100%{transform:translate(0,0);}`,
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(4px,8px);}100%{transform:translate(0,0);}`,
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(-4px,-8px);}100%{transform:translate(0,0);}`,
  keyframes`0%{transform:translate(0,0);}50%{transform:translate(6px,6px);}100%{transform:translate(0,0);}`
];

// Estructura
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

const CardAvatarContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

const CardAvatar = styled.div<{ $visible: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  transition: opacity 0.3s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;

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

const SkeletonAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    #eeeeee 25%,
    #dddddd 50%,
    #eeeeee 75%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;

const SkeletonTitle = styled.div`
  width: 70%;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    #eeeeee 25%,
    #dddddd 50%,
    #eeeeee 75%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;
