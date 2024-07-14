FROM node:latest 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

# Copy static files to dist directory
RUN cp -r public dist/public

EXPOSE 3000

CMD ["npm", "start"]