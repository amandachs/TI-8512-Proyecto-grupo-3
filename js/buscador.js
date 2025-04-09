document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#buscador input");
  const sugerencias = document.getElementById("sugerencias");

  let recetas = [];

  async function cargarRecetas() {
    const letras = "abcdefghijklmnopqrstuvwxyz".split("");
    recetas = [];

    for (const letra of letras) {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letra}`
        );
        const data = await res.json();
        if (data.meals) {
          recetas = recetas.concat(data.meals);
        }
      } catch (error) {
        console.error(`Error al cargar recetas con letra ${letra}`, error);
      }
    }
  }

  function mostrarSugerencias(texto) {
    sugerencias.innerHTML = "";
    sugerencias.classList.remove("buscador__sugerencias--mostrar");

    if (!texto) return;

    const filtradas = recetas.filter((receta) =>
      receta.strMeal.toLowerCase().includes(texto)
    );

    if (filtradas.length === 0) return;

    filtradas.slice(0, 5).forEach((receta) => {
      const li = document.createElement("li");
      li.className = "buscador__sugerencias-item";
      li.textContent = receta.strMeal;
      li.addEventListener("click", () => redirigirADetalles(receta));
      sugerencias.appendChild(li);
    });

    sugerencias.classList.add("buscador__sugerencias--mostrar");
  }

  function redirigirADetalles(receta) {
    const id = receta.idMeal;
    window.location.href = `detalle-receta.html?id=${id}`;
  }

  input.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    mostrarSugerencias(texto);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const texto = input.value.toLowerCase();
      const match = recetas.find(
        (receta) => receta.strMeal.toLowerCase() === texto
      );
      if (match) {
        redirigirADetalles(match);
      } else {
        sugerencias.innerHTML = `<li class="list-group-item text-danger">No se encontró la receta</li>`;
        sugerencias.classList.add("buscador__sugerencias--mostrar");
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (!sugerencias.contains(e.target) && e.target !== input) {
      sugerencias.classList.remove("buscador__sugerencias--mostrar");
    }
  });

  cargarRecetas();
});
