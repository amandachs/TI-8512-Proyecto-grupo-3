document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.body.innerHTML = "<p class='text-center text-danger'>No se encontró la receta.</p>";
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      const receta = data.meals[0];

      document.getElementById("imagen").src = receta.strMealThumb;
      document.getElementById("imagen").alt = receta.strMeal;
      document.getElementById("nombre-receta").textContent = receta.strMeal;
      document.getElementById("categoria-receta").textContent = receta.strCategory;

      const lista = document.getElementById("lista-ingredientes");
      for (let i = 1; i <= 20; i++) {
        const ingrediente = receta[`strIngredient${i}`];
        const medida = receta[`strMeasure${i}`];
        if (ingrediente && ingrediente.trim() !== "") {
          const li = document.createElement("li");
          li.textContent = `• ${medida} ${ingrediente}`;
          lista.appendChild(li);
        }
      }
    })
    .catch(error => {
      console.error("Error al cargar la receta:", error);
      document.body.innerHTML = "<p class='text-center text-danger'>Error al cargar los datos de la receta.</p>";
    });
});