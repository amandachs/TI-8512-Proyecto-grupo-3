import { obtenerCantidadRecetasPorCategoria } from "./grafico.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-categorias");
  const chartContainer = document.getElementById("chartContainer");
  const infoContainer = document.getElementById("infoContainer");

  chartContainer.innerHTML = '<p class="text-center">Cargando...</p>';

  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {
      const categorias = data.categories.sort((a, b) =>
        a.strCategory.localeCompare(b.strCategory)
      );

      categorias.forEach((categoria) => {
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3";

        col.innerHTML = `
            <div class="card h-100 card-category shadow-sm" style="background-color: #F5F5F5;">
              <img src="${categoria.strCategoryThumb}" class="card-img-top" alt="${categoria.strCategory}">
              <div class="card-body text-left">
                <h5 class="card-title">
                  <a href="recetas.html?categoria=${categoria.strCategory}" class="text-decoration-none text-dark">
                    ${categoria.strCategory}
                  </a>
                </h5>
              </div>
            </div>
          `;

        contenedor.appendChild(col);
      });

      // Después de cargar las categorías, se obtienen las cantidades de recetas por categoría
      obtenerCantidadRecetasPorCategoria(categorias);
    })
    .catch((error) => {
      contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar categorías.</p>`;
      console.error("Error:", error);
    });
});
