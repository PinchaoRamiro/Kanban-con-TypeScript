# Usa la imagen base oficial de Node.js
FROM node:latest 

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /dir

# Acceder a los archivos a los que se va a acceder
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

RUN npm run build 

# Expone el puerto en el cual la aplicación estará corriendo
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/app.js"]