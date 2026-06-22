FROM node AS build

WORKDIR /src

COPY . .
RUN npm ci
RUN npm run build


# ---- Runtime stage ----
FROM nginx:stable-alpine

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=build /src/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
