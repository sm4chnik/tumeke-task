# Web version only; the React Native app is built with Xcode / Android Studio
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
# postinstall links assets into the native projects, which the web build doesn't need
RUN yarn install --frozen-lockfile --ignore-scripts
COPY . .
RUN yarn react-scripts build

FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
