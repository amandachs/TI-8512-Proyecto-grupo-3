import React from 'react';
import styled from 'styled-components';
import { GeoMap } from 'geolocation-react-lib';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  margin: 2rem 0;
  transition: color 0.3s ease, transform 0.2s ease;
`;

export default function Geolocation() {
  return (
    <Container>
      <Title>Mi Mapa</Title>
      <GeoMap />
    </Container>
  );
}