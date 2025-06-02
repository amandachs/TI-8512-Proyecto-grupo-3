# TI-8512-Proyecto-grupo-3
Este proyecto se centra en la visualización de entidades relacionadas con recetas de cocina utilizando el API TheMealDB. A través de esta API, se gestionan y muestran categorías de recetas, detalles de cada plato, ingredientes y cantidades, todo de manera interactiva en la página web.

## Organización de componentes por entidad
Los componentes de React en este proyecto están organizados de forma lógica por **entidad**, lo cual permite una estructura clara, mantenible y escalable.

### Estructura general
components/
├── BackButton.tsx ← Componente reutilizable para navegación
├── CategoriaCard.tsx ← Representación visual de una categoría individual
├── CategoriasGrid.tsx ← Muestra un conjunto de categorías
├── DetallesRecetaCard.tsx ← Detalles (ingredientes) visuales de una receta específica
├── Geolocation.tsx ← Muestra un mapa con ubicación geográfica
├── NavBar.tsx ← Barra de navegación principal
├── NotificationModal.tsx ← Modal para notificaciones personalizadas
├── RecetaCard.tsx ← Componente visual de una receta individual
├── RecetasGrid.tsx ← Vista de conjunto de recetas
├── SearchBar.tsx ← Barra de búsqueda de recetas
└── Title.tsx ← Título estilizado reutilizable

### 🔍 Agrupación por entidad
- **Categorías**:
  - `CategoriaCard.tsx`
  - `CategoriasGrid.tsx`
- **Recetas**:
  - `RecetaCard.tsx`
  - `RecetasGrid.tsx`
  - `DetallesRecetaCard.tsx`
- **UI genérica**:
  - `BackButton.tsx`  
  - `NavBar.tsx`
  - `SearchBar.tsx`  
  - `Title.tsx`
  - `NotificationModal.tsx`
  - `Geolocation.tsx`

## Reglas de nomenclaturas
#### Componentes
- El nombre de cada archivo de componente se escribe en **PascalCase** (también conocido como UpperCamelCase).
#### Variables
- Se utiliza camelCase para variables, funciones y hooks.
#### Styled components
- Se nombran en PascalCase y reflejan claramente el propósito del elemento estilizado.