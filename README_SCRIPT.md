## Despliegue en Google Cloud Run con `deploy_gcloud.sh`

Este proyecto incluye un script de Bash (`deploy_gcloud.sh`) que facilita el despliegue en Google Cloud Run. El script automatiza el proceso de configuración de variables de entorno, construcción de la imagen Docker, subida a Google Container Registry, y despliegue en Cloud Run.

### Requisitos Previos

1. **Google Cloud CLI**:

   - Asegúrate de tener instalada la [Google Cloud CLI](https://cloud.google.com/sdk/docs/install).
   - Autentícate en Google Cloud ejecutando:
     ```bash
     gcloud auth login
     ```

2. **Configuración del Proyecto de Google Cloud**:

   - Si no has configurado tu proyecto en Google Cloud CLI, hazlo con:
     ```bash
     gcloud config set project [PROJECT_ID]
     ```

3. **Habilitar APIs necesarias**:
   - Activa las siguientes APIs en Google Cloud:
     - Cloud Run API
     - Cloud Build API
     - Container Registry API

### Archivo `.env`

El archivo `.env` debe contener las variables de entorno necesarias para la aplicación (como claves API, URLs de base de datos, etc.). Este archivo **no debe incluir información específica de Google Cloud** como el `PROJECT_ID`, `REGION`, o `SERVICE_NAME`.

Ejemplo de archivo `.env`:

```plaintext
API_KEY=your_api_key
DATABASE_URL=your_database_url
```

Guarda el archivo `.env` en la raíz del proyecto o especifica una ruta personalizada cuando ejecutes el script.

### Uso del Script `deploy_gcloud.sh`

El script `deploy_gcloud.sh` te guiará a través de los pasos necesarios para desplegar el proyecto en Google Cloud Run, solicitando la configuración necesaria y utilizando las variables de entorno desde el archivo `.env`.

#### 1. Hacer Ejecutable el Script

Si el script no tiene permisos de ejecución, configúralos con el siguiente comando:

```bash
chmod +x deploy_gcloud.sh
```

#### 2. Ejecutar el Script de Despliegue

Ejecuta el siguiente comando para iniciar el despliegue:

```bash
./deploy_gcloud.sh

# o usa el script del package.json para esto que integra los dos pasos anteriores
yarn deploy

# o npm
npm run deploy
```

#### 3. Responde a las Preguntas del Script

Durante la ejecución del script, se te solicitará:

1. **Ruta del archivo `.env`**: La ubicación de tu archivo `.env`. Si está en la raíz del proyecto, puedes presionar Enter para aceptar la ruta predeterminada (`./.env`).
2. **Project ID**: El ID de tu proyecto en Google Cloud.
3. **Image Name**: El nombre que quieres dar a la imagen Docker (opcional, por defecto `my-app-image`).
4. **Service Name**: El nombre del servicio en Cloud Run (opcional, por defecto `my-service`).
5. **Region**: La región de despliegue en Cloud Run (opcional, por defecto `us-central1`).

#### Ejemplo de Ejecución

```plaintext
Ingrese la ruta del archivo .env (default: ./.env):
Ingrese su Project ID de Google Cloud: my-project-id
Ingrese el nombre de la imagen Docker (default: my-app-image):
Ingrese el nombre del servicio en Cloud Run (default: my-service):
Ingrese la región de despliegue (default: us-central1):
```

### ¿Qué Hace el Script?

1. **Carga las Variables de Entorno** desde el archivo `.env` y las convierte en un formato compatible con Google Cloud Run.
2. **Construye y Sube la Imagen Docker** a Google Container Registry (GCR).
3. **Despliega el Servicio en Cloud Run**, pasando las variables de entorno del archivo `.env`.

### Detalles Técnicos del Script

- **Cargar Variables desde `.env`**: El script lee el archivo `.env` y convierte cada variable en el formato `KEY=VALUE` que Google Cloud Run necesita para la opción `--set-env-vars`.
- **Google Cloud Run Deployment**: Usa el comando `gcloud run deploy` para desplegar la imagen en Cloud Run, configurando las variables de entorno, el acceso público y el servicio de contenedores.

### Notas Finales

- **Privacidad de Variables**: Asegúrate de no compartir el archivo `.env` en repositorios públicos, ya que podría contener información sensible.
- **Errores Comunes**:
  - Si el archivo `.env` no se encuentra, el script mostrará un error. Verifica que el archivo esté en la ruta correcta.
  - Asegúrate de que el `PROJECT_ID` esté correcto y que tengas permisos suficientes en Google Cloud.

### Despliegue Exitoso

Al finalizar, el script mostrará el mensaje `Despliegue completado exitosamente.` y tu aplicación estará accesible desde la URL pública que Google Cloud Run proporciona.

---

# Alternativa a Cloud Build

El uso de **Cloud Build** en Google Cloud no es estrictamente necesario para desplegar en Cloud Run, pero es conveniente en algunos casos, especialmente si prefieres no construir las imágenes Docker localmente. Aquí te explico cuándo y por qué podrías necesitar Cloud Build, y también cómo puedes evitarlo si prefieres no usarlo.

### ¿Cuándo es necesario Cloud Build?

1. **Si prefieres que Google gestione la construcción de la imagen Docker**:

   - Cloud Build puede encargarse de construir tu imagen Docker desde el código fuente y luego subirla a Google Container Registry (GCR) automáticamente.
   - Esto es útil si trabajas desde una máquina sin Docker instalado o si quieres simplificar el proceso.

2. **Para integraciones automáticas y despliegues continuos (CI/CD)**:
   - Si deseas configurar un flujo de CI/CD donde cada cambio en tu repositorio desencadena una nueva construcción y despliegue, Cloud Build es ideal. Puedes integrarlo con repositorios de GitHub o GitLab y hacer que el proceso de despliegue sea completamente automático.

### ¿Es posible evitar Cloud Build?

Sí, puedes evitar Cloud Build si prefieres construir y subir la imagen manualmente usando Docker localmente. Aquí están los pasos para hacerlo sin Cloud Build:

#### Opción A: Construir y Subir la Imagen Manualmente con Docker y gcloud

1. **Construye la Imagen Docker Localmente**:

   - Desde el directorio donde tienes tu `Dockerfile`, ejecuta:
     ```bash
     docker build -t gcr.io/[PROJECT_ID]/[IMAGE_NAME] .
     ```

2. **Autentica Docker con Google Container Registry**:

   - Usa el siguiente comando para autenticar Docker con GCR:
     ```bash
     gcloud auth configure-docker
     ```

3. **Sube la Imagen a Google Container Registry (GCR)**:

   - Sube la imagen a GCR con el comando:
     ```bash
     docker push gcr.io/[PROJECT_ID]/[IMAGE_NAME]
     ```

4. **Despliega la Imagen en Cloud Run**:

   - Una vez que la imagen esté en GCR, puedes desplegarla en Cloud Run sin usar Cloud Build:

     ```bash
     gcloud run deploy [SERVICE_NAME] \
       --image gcr.io/[PROJECT_ID]/[IMAGE_NAME] \
       --platform managed \
       --region [REGION] \
       --allow-unauthenticated
       --set-env-vars "$ENV_VARS"
     ```
