import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetallesRecetaCard from '../components/DetallesRecetaCard';
import BackButton from '../components/BackButton';

interface Receta {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
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

  // Extraer ingredientes de la receta
  const ingredientes = Object.entries(receta)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([_, value]) => value as string);

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