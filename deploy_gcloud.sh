#!/bin/bash

read -p "Ingrese la ruta del archivo .env (default: ./.env): " ENV_PATH
ENV_PATH=${ENV_PATH:-.env}

if [ ! -f "$ENV_PATH" ]; then
  echo "Error: No se encontró el archivo .env en $ENV_PATH"
  exit 1
fi

ENV_VARS=""
while IFS= read -r line || [ -n "$line" ]; do
  if [[ -n "$line" && "$line" != \#* ]]; then
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    ENV_VARS+="$key=$value,"
  fi
done < "$ENV_PATH"
ENV_VARS=${ENV_VARS%,}

read -p "Ingrese su Project ID de Google Cloud: " PROJECT_ID
if [ -z "$PROJECT_ID" ]; then
  echo "Error: PROJECT_ID es requerido."
  exit 1
fi

read -p "Ingrese el nombre de la imagen Docker (default: my-app-image): " IMAGE_NAME
IMAGE_NAME=${IMAGE_NAME:-my-app-image}

read -p "Ingrese el nombre del servicio en Cloud Run (default: my-service): " SERVICE_NAME
SERVICE_NAME=${SERVICE_NAME:-my-service}

read -p "Ingrese la región de despliegue (default: us-central1): " REGION
REGION=${REGION:-us-central1}

echo "Construyendo y subiendo la imagen a Google Container Registry..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_NAME

echo "Desplegando el servicio en Google Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars "$ENV_VARS"

echo "Despliegue completado exitosamente."
