FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
# compile typescript in WORKDIR
# after the packages are installed
RUN npm run server:compile
CMD ["npm", "start"]