# Card-Collection-App

This is a card collection app completed during intership at CMB. The backend uses Maven, Spring, Thymeleaf as well as many extentions including Spring Boot, Spring Data JPA, and Spring Data Rest. The frontend uses React, Webpack and Ant Design UI framework. The database here is H2 in-memory database for easy prototyping. 

## How to Build

Firstly, make sure you have Java 8 or above installed. Clone the repository and go into the project folder

```
git clone https://github.com/lzyang1995/Card-Collection-App.git
cd Card-Collection-App
```

Download a project specific Node and npm

```
mvnw frontend:install-node-and-npm -DnodeVersion=v12.18.2
```

Install the dependencies (may take several minutes)

```
mvnw frontend:npm
```

Build the frontend using Webpack

```
mvnw frontend:webpack
```

Start the server

```
mvnw spring-boot:run
```

Now you can go to <http://localhost:8080/> to see the website. The H2 database console is also available 
at <http://localhost:8080/h2-console>. The default JDBC URL, username and password for the database are as follows:

* JDBC URL: jdbc:h2:mem:test_mem
* User name: sa
* Password: password


