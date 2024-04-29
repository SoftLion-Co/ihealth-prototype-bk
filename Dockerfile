FROM node:14 AS build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:14

WORKDIR /app
COPY --from=build /app .
CMD ["node", "app.js"]
