FROM node:alpine
WORKDIR /app
COPY ./package.json ./
# install typescript globally
RUN npm install
RUN npm run server:compile
COPY . .
# compile typescript in WORKDIR
CMD ["npm", "start"]
# CMD ["npm", "run", "start"]
# At the time of writing this, deployment seems
# to be failing on the npm start command...
# See if RUN makes the deployment work
# RUN npm start
