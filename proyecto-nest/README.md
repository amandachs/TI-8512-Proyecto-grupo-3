# Proyecto Nest

## Descripción
Proyecto base desarrollado con NestJS, PostgreSQL y Docker.

## Requisitos Previos
- Node.js (v16 o superior)
- npm
- Docker y Docker Compose

## Configuración del Proyecto

### Instalación de dependencias
```bash
npm install
```

## Convenciones de Nomenclatura

### General
- Uso de **camelCase** para variables, funciones y métodos
- Uso de **PascalCase** para clases, interfaces y definiciones de tipo
- Uso de **kebab-case** para nombres de archivos y directorios

### Endpoints de la API
- Usar los métodos HTTP apropiadamente:
  - `GET` para obtener recursos
  - `POST` para crear recursos
  - `PUT` para actualizar recursos
  - `DELETE` para eliminar recursos

## Configuración de Base de Datos con PostgreSQL y Docker

### Pasos de Configuración

1. Inicia el contenedor de PostgreSQL:
   ```bash
   docker-compose up -d
   ```

2. Ejecuta las migraciones (si usas TypeORM o similar):
   ```bash
   npm run typeorm migration:run
   ```

3. Para detener la base de datos:
   ```bash
   docker-compose down
   ```

### Configuración de Docker Compose
Crea un archivo `docker-compose.yml` en la raíz del proyecto con:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    container_name: proyecto_db
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## Ejecutar el Proyecto

```bash
# Modo desarrollo
$ npm run start:dev

# Modo producción
$ npm run build
$ npm run start:prod
```

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
