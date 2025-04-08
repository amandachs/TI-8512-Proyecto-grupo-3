async function obtenerCantidadRecetasPorCategoria(categorias) {
  const nombresCategorias = [];
  const recetasPorCategoria = [];
  const coloresVerde = generarColoresVerde(categorias.length); // Generar colores verde dinámicos

  for (const categoria of categorias) {
    nombresCategorias.push(categoria.strCategory);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria.strCategory}`
      );
      const data = await response.json();

      recetasPorCategoria.push(data.meals ? data.meals.length : 0);
    } catch (error) {
      console.error(
        `Error al obtener recetas para ${categoria.strCategory}:`,
        error
      );
      recetasPorCategoria.push(0);
    }
  }

  generarGrafico(nombresCategorias, recetasPorCategoria, coloresVerde);
}

function generarGrafico(categorias, recetas, colores) {
  const chartContainer = document.getElementById("chartContainer");
  chartContainer.innerHTML = "";

  const trace1 = {
    y: categorias,
    x: recetas,
    type: "bar",
    text: recetas.map(String),
    textposition: "auto",
    hoverinfo: "none",
    orientation: "h",
    marker: {
      color: colores,
      opacity: 0.8,
      line: {
        color: "rgb(0, 0, 0)",
        width: 2,
      },
    },
  };

  const data = [trace1];

  const layout = {
    title: { text: "Cantidad de recetas por categoría" },
    yaxis: { tickangle: 0 },
    barmode: "stack",
  };

  const config = { responsive: true };

  Plotly.newPlot("chartContainer", data, layout, config);
}

function generarColoresVerde(cant) {
  const coloresVerde = [];
  const verdeBase = [26, 86, 31];
  for (let i = 0; i < cant; i++) {
    const factor = 50 + i * 12;
    const verde = `rgb(${Math.min(verdeBase[0] + factor, 255)}, ${Math.min(
      verdeBase[1] + factor,
      255
    )}, ${Math.min(verdeBase[2] + factor, 255)})`;
    coloresVerde.push(verde);
  }
  return coloresVerde;
}

export { obtenerCantidadRecetasPorCategoria };
