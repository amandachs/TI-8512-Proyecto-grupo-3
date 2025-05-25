import React from "react";
import DetallesRecetaCard from "./components/DetallesRecetaCard"; // Asegúrese de que la ruta coincida

const App: React.FC = () => {
  // Datos simulados
  const recetaDemo = {
    nombre: "Spaghetti Bolognese",
    imagen: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
    categoria: "Pasta",
    ingredientes: [
      "• 200g Spaghetti",
      "• 100g Ground Beef",
      "• 1 Onion",
      "• 2 Garlic cloves",
      "• 400g Tomato sauce",
      "• Olive oil",
      "• Salt",
      "• Pepper",
      "• Basil"
    ]
  };

  return (
    <div style={{ padding: "2rem" }}>
      <DetallesRecetaCard
        nombre={recetaDemo.nombre}
        imagen={recetaDemo.imagen}
        categoria={recetaDemo.categoria}
        ingredientes={recetaDemo.ingredientes}
      />
    </div>
  );
};

export default App;
