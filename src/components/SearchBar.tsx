import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import background from "../images/background.svg";

interface Receta {
  idMeal: string;
  strMeal: string;
}

const SearchBar: React.FC = () => {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [input, setInput] = useState("");
  const [sugerencias, setSugerencias] = useState<Receta[]>([]);
  const navigate = useNavigate();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const cargarRecetas = async () => {
      const letras = "abcdefghijklmnopqrstuvwxyz".split("");
      let todas: Receta[] = [];

      for (const letra of letras) {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letra}`);
          const data = await res.json();
          if (data.meals) {
            todas = todas.concat(data.meals);
          }
        } catch (error) {
          console.error(`Error al cargar recetas con letra ${letra}`, error);
        }
      }

      setRecetas(todas);
    };

    cargarRecetas();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setInput(texto);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (!texto || texto.length < 2) {
        setSugerencias([]);
        return;
      }

      const filtradas = recetas.filter((receta) =>
        receta.strMeal.toLowerCase().includes(texto)
      ).slice(0, 5);
      setSugerencias(filtradas);
    }, 300);
  };

  const redirigirADetalles = (receta: Receta) => {
    navigate(`/detalle/${receta.idMeal}`);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const match = recetas.find((receta) => receta.strMeal.toLowerCase() === input);
      if (match) {
        redirigirADetalles(match);
      } else {
        setSugerencias([]);
      }
    }
  };

  return (
    <Wrapper>
      <SearchCard>
        <h2>¿Qué te gustaría cocinar?</h2>
        <p>Descubre recetas de todas partes del mundo, creadas por los mejores chefs.</p>
        <InputContainer>
          <input
            type="text"
            placeholder="Buscar"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleEnter}
          />
          {sugerencias.length > 0 && (
            <Suggestions>
              {sugerencias.map((receta) => (
                <li key={receta.idMeal} onClick={() => redirigirADetalles(receta)}>
                  {receta.strMeal}
                </li>
              ))}
            </Suggestions>
          )}
        </InputContainer>
      </SearchCard>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchCard = styled.div`
  background-color: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 620px;
  width: 90%;
  text-align: center;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #111;
  }

  p {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1.25rem;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;

  input {
    width: 80%;
    height: 50px;
    border-radius: 28px;
    padding: 0 20px;
    font-size: 1rem;
    border: 2px solid #ccc;
    outline: none;
    transition: border 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      border-color: #000;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
`;

const Suggestions = styled.ul`
  position: absolute;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  margin-top: 8px;
  list-style: none;
  padding: 0;
  z-index: 10;

  li {
    padding: 12px 16px;
    cursor: pointer;
    font-size: 0.95rem;
    color: #333;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: #f2f2f2;
      transform: translateX(2px);
    }
  }
`;
