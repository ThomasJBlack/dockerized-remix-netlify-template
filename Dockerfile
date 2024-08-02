FROM node

COPY . /snyking
WORKDIR /snyking

RUN npm install

CMD ["npm", "run", "dev"]