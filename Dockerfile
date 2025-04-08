FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY src/ ./src

RUN npm install -g typescript
RUN npm install
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]