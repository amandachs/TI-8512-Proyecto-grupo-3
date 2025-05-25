import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface RecetaCardProps {
  nombre: string;
  imagen: string;
  id: string;
}

const RecetaCard: React.FC<RecetaCardProps> = ({ nombre, imagen, id }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <CardLink to={`/detalle/${id}`}>
      <Card>
        <AvatarContainer>
          {!isLoaded && <SkeletonAvatar />}
          <Avatar style={{ backgroundImage: `url(${imagen})` }} $visible={isLoaded}>
            <img
              src={imagen}
              alt={nombre}
              style={{ display: 'none' }}
              onLoad={() => setIsLoaded(true)}
            />
          </Avatar>
        </AvatarContainer>

        {!isLoaded ? <SkeletonTitle /> : <CardTitle>{nombre}</CardTitle>}
      </Card>
    </CardLink>
  );
};

export default RecetaCard;

// ✨ Animación shimmer solo para skeletons
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

//Estilos
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
    box-shadow: 0 0 0 2px #00000010, 0 0 20px #99999940;
    transform: scale(1.02);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

const Avatar = styled.div<{ $visible: boolean }>`
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
  font-size: clamp(0.9rem, 1.2vw, 1.3rem);
  font-weight: 600;
  text-align: center;
  color: #333;
  line-height: 1.2;
  max-width: 100%;
  padding: 0 0.5rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;      // Máximo 2 líneas visibles
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 🦴 Skeletons
const SkeletonAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(90deg, #eeeeee 25%, #dddddd 50%, #eeeeee 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;

const SkeletonTitle = styled.div`
  width: 70%;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(90deg, #eeeeee 25%, #dddddd 50%, #eeeeee 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;
