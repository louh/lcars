FROM node

ADD . /src
WORKDIR /src

RUN npm install
EXPOSE 5173
CMD ["npm", "start"]
