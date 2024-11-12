# Etapa 1: Construcción
FROM node:18-alpine AS builder
WORKDIR /app

# Copia los archivos de configuración e instala dependencias
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia el resto de los archivos y construye el proyecto
COPY . .
RUN yarn build

# Etapa 2: Producción
FROM node:18-alpine
WORKDIR /app

# Copia solo los archivos necesarios de la etapa de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# Instala solo dependencias de producción
RUN yarn install --production --frozen-lockfile

# Expone el puerto y define el comando de inicio
EXPOSE 8080
CMD ["node", "./dist/server.js"]
