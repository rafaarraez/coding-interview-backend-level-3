# Usar una imagen base de Node.js 20
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compila el código TypeScript antes de ejecutar la aplicación
RUN npm run build

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación con ts-node
CMD ["node", "dist/index.js"]
