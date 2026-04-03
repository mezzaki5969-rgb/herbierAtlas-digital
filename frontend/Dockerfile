# Étape 1 : Build de l'application Vue/Vite
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : Serveur de production Nginx
FROM nginx:alpine
# Copie des fichiers compilés
COPY --from=build /app/dist /usr/share/nginx/html
# Configuration reverse-proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
