FROM node:18-alpine
LABEL maintainer="MARCIN STENKA"

WORKDIR /app

COPY ./frontend/public/ /app/public
COPY ./frontend/src/ /app/src
COPY ./frontend/package.json /app/
ENV PATH /frontend/node_modules/.bin:$PATH
EXPOSE 3000
RUN npm install
CMD ["npm", "start"]