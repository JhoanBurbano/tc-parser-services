# Question Service API

## Descripción

Question Service API es un servicio de backend diseñado para consumir y transformar datos de un endpoint externo, devolviendo información en un formato personalizado. Este proyecto está desarrollado en **Node.js** con **TypeScript**, siguiendo las mejores prácticas de arquitectura y diseño, y aplicando una documentación completa en **OpenAPI/Swagger**.

## Tecnologías y Dependencias

- **Node.js** y **TypeScript**: Base de desarrollo del proyecto.
- **Express**: Framework de servidor web.
- **Axios**: Cliente HTTP para consumir la API externa.
- **Swagger**: Documentación API interactiva.
- **Docker**: Para despliegue en contenedores.
- **Google Cloud Run**: Plataforma de despliegue.
- **Jest** y **Supertest**: Pruebas unitarias e integradas.

## Requisitos Previos

- Node.js (versión 14 o superior)
- Yarn (opcional, recomendado)
- Cuenta en Google Cloud Platform para desplegar en Cloud Run

## Configuración e Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/usuario/question-service.git
   cd question-service
   ```

2. **Instalar dependencias:**

   ```bash
   yarn install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```plaintext
   AUTH_TOKEN=Bearer eyJ0eX...6NcNaXdpuY
   API_URL=https://us-central1-teamcore-retail.cloudfunctions.net/test_mobile/api/questions
   ```

4. **Compilar el proyecto:**

   ```bash
   yarn build
   ```

5. **Ejecutar el servidor:**

   ```bash
   yarn start
   ```

6. **Acceder a la documentación de la API:**
   La API documentada en Swagger está disponible en `http://localhost:3000/api-docs`.

## Endpoints

### `GET /api/questions`

- **Descripción:** Obtiene las preguntas en un formato específico.
- **Respuesta:**
  ```json
  {
    "titulo": "Preguntas transformadas",
    "dia": "DD-MM-YYYY",
    "info": [
      {
        "pregunta_id": 1,
        "pregunta": "¿Cuál es tu nombre?"
      }
    ],
    "api_version": 1
  }
  ```

## Pruebas

Para ejecutar las pruebas unitarias y de integración:

```bash
yarn test
```

## Despliegue en Google Cloud Run

1. **Construir y subir la imagen Docker:**

   ```bash
   gcloud auth login
   gcloud config set project [PROJECT_ID]
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/question-service
   ```

2. **Desplegar el servicio en Cloud Run:**

   ```bash
   gcloud run deploy question-service --image gcr.io/[PROJECT_ID]/question-service --platform managed --region [REGION]
   ```

3. **Acceder a la API desplegada:**
   Visita la URL proporcionada por Google Cloud Run después del despliegue.

## Estructura del Proyecto

```plaintext
teamcore-parser-service/
├── src/
│   ├── controllers/
│   │   └── question.controller.ts
│   ├── services/
│   │   └── question.service.ts
│   ├── middlewares/
│   │   └── errorHandler.middleware.ts
│   ├── mappers/
│   │   └── question.mapper.ts
│   ├── utils/
│   │   ├── dateFormatter.ts
│   │   └── logger.ts
│   ├── config/
│   │   └── environment.config.ts
│   ├── types/
│   │   ├── question.types.ts
│   │   └── common.types.ts
│   ├── app.ts
│   ├── server.ts
├── __tests__/
│   ├── questionController.test.ts
│   └── questionService.test.ts
├── .env
├── .gitignore
├── Dockerfile
├── jest.config.js
├── tsconfig.json
└── README.md
```

## Consideraciones de Seguridad

- **Gestión de Variables Sensibles:** Las credenciales y URLs se manejan a través de variables de entorno.
- **Middleware de Manejo de Errores:** Captura errores y evita exponer detalles de errores sensibles en el entorno de producción.

- **Validación de Entradas y Respuestas:** Uso de tipos y validación en TypeScript para asegurar que los datos manipulados y devueltos cumplen con los requisitos de la API.

\_\_

## Subir a cloud run

```bash
yarn deploy
```
