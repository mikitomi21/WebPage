FROM node:18-alpine
LABEL maintainer="MARCIN STENKA"

WORKDIR /frontend

COPY ./frontend/public/ /frontend/public
COPY ./frontend/src/ /frontend/src
COPY ./frontend/build /frontend/build
COPY ./frontend/package.json /frontend/
ENV PATH /frontend/node_modules/.bin:$PATH
EXPOSE 3000
RUN npm install
CMD ["npm", "start"]