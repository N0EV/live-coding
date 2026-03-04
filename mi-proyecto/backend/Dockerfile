# Usa una imagen ligera de Node
# FROM node:18-alpine
FROM python:3.11-slim

# Crea el directorio de trabajo
# WORKDIR /app
WORKDIR /app

# Copia los archivos de dependencias y las instala
# COPY package*.json ./
# RUN npm install

COPY . .
RUN ["pip", "install", "--no-cache-dir", "-r", "requirements.txt"]

# Copia el resto del código
# COPY . .

# Expone el puerto que usa tu app
# EXPOSE 3000
EXPOSE 5000

# Comando para arrancar la app
# CMD ["node", "app.js"]
CMD ["python", "app.py"]