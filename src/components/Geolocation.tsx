import React from 'react';
import { GeoMap } from 'geolocation-react-lib';

export default function Geolocation() {
  return (
    <div>
      <h1>Mi Mapa</h1>
      <GeoMap />
    </div>
  );
}