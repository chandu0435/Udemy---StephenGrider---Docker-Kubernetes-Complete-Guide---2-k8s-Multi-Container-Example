FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run server:compile
CMD ["npm", "start"]
# CMD ["npm", "run", "start"]
# At the time of writing this, deployment seems
# to be failing on the npm start command...
# See if RUN makes the deployment work
# ... yep, that made it work...
# RUN npm start