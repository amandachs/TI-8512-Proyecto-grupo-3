document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");
  
    const nombreCategoria = document.getElementById("nombre-categoria");
    const contenedor = document.getElementById("recetas");
    const banner = document.getElementById("imagen-banner");
  
    if (!categoria) {
      contenedor.innerHTML = "<p>No se especificó una categoría.</p>";
      return;
    }
  
    nombreCategoria.textContent = categoria;
  
    // Imagen del banner dinámico
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => {
        const catData = data.categories.find(cat => cat.strCategory === categoria);
        if (catData) {
          banner.src = catData.strCategoryThumb;
          banner.alt = categoria;
        }
      });
  
    // Obtener recetas
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
      .then(res => res.json())
      .then(data => {
        if (!data.meals) {
          contenedor.innerHTML = "<p>No hay recetas para esta categoría.</p>";
          return;
        }
  
        data.meals.forEach(meal => {
          const col = document.createElement("div");
          col.className = "col-md-4 col-lg-3 mb-4";
          
          col.innerHTML = `
            <div class="card h-100 card-receta shadow-sm" style="background-color: #F5F5F5;">
              <img src="${meal.strMealThumb}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${meal.strMeal}">
              <div class="card-body text-left">
                <h5 class="card-title">
                  <a href="detalle-receta.html?id=${meal.idMeal}" class="text-decoration-none text-dark">
                    ${meal.strMeal}
                  </a>
                </h5>
              </div>
            </div>
          `;
          contenedor.appendChild(col);
        });
      })
      .catch(err => {
        console.error(err);
        contenedor.innerHTML = "<p>Error al cargar las recetas.</p>";
      });
  });  