FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
RUN sudo npm server:compile
COPY . .
CMD ["npm", "start"]
# CMD ["npm", "run", "start"]
# At the time of writing this, deployment seems
# to be failing on the npm start command...
# See if RUN makes the deployment work
# RUN npm start
