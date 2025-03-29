document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-categorias");
  
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
            <div class="card h-100 card-category shadow-sm">
              <img src="${categoria.strCategoryThumb}" class="card-img-top" alt="${categoria.strCategory}">
              <div class="card-body text-center">
                <h5 class="card-title">${categoria.strCategory}</h5>
              </div>
            </div>
          `;
  
          contenedor.appendChild(col);
        });
      })
      .catch((error) => {
        contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar categorías.</p>`;
        console.error("Error:", error);
      });
  });
  