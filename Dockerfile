FROM node:18
LABEL authors="Angel David"
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]