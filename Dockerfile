FROM node AS build

WORKDIR /src

# Install deps first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy only what the build needs (avoids copying .git/ and local node_modules/)
COPY index.html vite.config.js postcss.config.cjs tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm run build


# ---- Runtime stage ----
FROM nginx:stable-alpine

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=build /src/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
