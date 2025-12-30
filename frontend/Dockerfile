FROM node:24.12.0

WORKDIR /app/frontend

COPY package.json package-lock.json /app/frontend/

RUN npm ci

COPY . /app/frontend/

EXPOSE 5173

CMD ["npm", "run", "dev"]