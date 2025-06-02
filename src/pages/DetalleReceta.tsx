import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetallesRecetaCard from '../components/DetallesRecetaCard';
import BackButton from '../components/BackButton';

interface Receta {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  [key: string]: string | undefined; // Para acceder dinámicamente a strIngredientX y strMeasureX
}

interface Ingrediente {
  nombre: string;
  cantidad: string;
}

const DetalleReceta: React.FC = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState<Receta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No se especificó un ID de receta');
      setLoading(false);
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.meals || data.meals.length === 0) {
          setError('No se encontró la receta');
        } else {
          setReceta(data.meals[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar la receta');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error || !receta) {
    return <div>{error || 'No se encontró la receta'}</div>;
  }

  // Extraer ingredientes con cantidades
  const ingredientes: Ingrediente[] = [];
  for (let i = 1; i <= 20; i++) {
    const nombre = receta[`strIngredient${i}`];
    const cantidad = receta[`strMeasure${i}`];

    if (nombre && nombre.trim() !== '') {
      ingredientes.push({
        nombre: nombre.trim(),
        cantidad: (cantidad || '').trim(),
      });
    }
  }

  return (
    <>
      <BackButton />
      <DetallesRecetaCard
        nombre={receta.strMeal}
        imagen={receta.strMealThumb}
        categoria={receta.strCategory}
        ingredientes={ingredientes}
      />
    </>
  );
};

export default DetalleReceta;
