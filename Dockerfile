FROM node

ADD . /src
WORKDIR /src
RUN rm -Rf /src/.git

RUN npm install
EXPOSE 5173
CMD ["npm", "start"]
