FROM maven:3.8.6-openjdk-18
WORKDIR /tmp
COPY /src/ ./src
COPY /pom.xml ./
RUN mvn package
EXPOSE 8080
CMD ["java","-Xmx1024m", "-jar", "/tmp/target/devops-fatjar.jar"]

FROM maven:3.8.6-openjdk-18 AS MAVEN
WORKDIR /tmp
COPY /src/ ./src
COPY /pom.xml ./
RUN mvn package

FROM node:18-slim AS REACT
WORKDIR /tmp
COPY /instasnap/package.json  ./
COPY /instasnap/tsconfig.json ./
RUN yarn install
COPY /instasnap/src ./src
COPY /instasnap/public ./public
RUN yarn build

FROM openjdk:18-alpine
WORKDIR /tmp
COPY --from=MAVEN /tmp/target ./
COPY --from=REACT /tmp/build ./src/main/instasnap/
EXPOSE 8080
CMD ["java","-Xmx1024m", "-jar", "/tmp/devops-fatjar.jar"]