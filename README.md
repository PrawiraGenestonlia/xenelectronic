# XenElectronic

This is a full-stack mono repository for XenElectronic, one of electronics and home appliance store.

As part of XenElectronic MVP, this application has the following features:
- Customers should be able to view the list of the products based on the product categories
- Customers should be able to add the products to the shopping cart
- Customers should be able to view the products listed on the shopping cart
- Customers should be able to remove the products listed on the shopping cart
- Customers should be able to checkout shopping cart and continue their transaction to payment


## Getting Started

### Prerequisites

* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - v8.x
* [Node.js](https://nodejs.org/en/) - v16.x
* [git](https://git-scm.com/downloads)
* [Heroku PostgreSQL](https://www.heroku.com/postgres) - for Heroku Development and Production Environment
* [SQLite](https://www.sqlite.org/index.html) - for Local Development

### Installing the roject

``` bash
$ git clone https://github.com/PrawiraGenestonlia/xenelectronic
$ cd xenelectronic
$ npm install
```

### Running the project (locally)

``` bash
$ npm run dev
```

There will be 2 services being run - api and ui. api-service will be listening to port 8080 and ui-service will be listening to port 3000. 
The development environment is hot-reload enabled, as such, there is no need to restart the program when changing source code files. 
For OpenAPI documentation, you can navigate to http://localhost:8080/api/docs/ to access swagger application. 

## Running the tests

If you want to run unit test for the project, run `npm run test` command. 
However, if you want to run coverage test, run `npm run coverage` command. If there are no failed test cases, lcov html files will be generated and this command will automatically opens the coverage results for both api and ui. 

### Test suites

#### api

As the api is written in TypeScript (node.js), the following technology is used:
* [mocha](https://mochajs.org/) - JavaScript test framework
* [chai](https://www.chaijs.com/) - JavaScript asserting library
* [nyc](https://istanbul.js.org/) - Code coverage generation tool

#### ui

As the ui is developed using React UI Library, the following technology is used:
* [react testing library](https://testing-library.com/docs/react-testing-library/intro/) - React testing library
* [jest](https://jestjs.io/) - JavaScript testing framework
* [nyc](https://istanbul.js.org/) - Code coverage generation tool
  
## Deployment

The application is deployed in heroku. Two versions are made public:
* [XenElectronic - development](https://xenelectronic-dev.herokuapp.com/) - Development environment for SIT
* [XenElectronic - production](https://xenelectronic-main.herokuapp.com/) - Production environment for public consumption

A single URL entry instead of separate url for api and ui is decided to ensure the project is accessible and secure through CORS control. If you would like to explore REST API services, do visit the [swagger file](https://xenelectronic-main.herokuapp.com/api/docs/).

### CI/CD pipeline

![CI/CD](images/heroku-cicd.png?raw=true "CI/CD")

When there are changes to the development branch in the repository, the application will be deployed to development environment. Upon successful testing and verification, a pull request to main branch is to be made. This will trigger a deployment in production environment.

## Built With

* [React](https://reactjs.org/) - The web UI library
* [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework
* [Express](https://expressjs.com/) - Node.js web application framework (for REST APIs)
* [TypeORM](https://typeorm.io/) - A typescript-enabled Object-Relational Mapping 
* [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database

## Project Implementation Details

The project is a monorepo project with npm workspace. This enables global scripts to start, build or test both api and ui repository with a single command. 
This is the project structure. 
```
- api                   //api application
- images               
- ui                    //ui web application
  .gitignore
  package-lock.json
  package.json
  Procfile
  README.md
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Prawira Genestonlia** - *Lead Developer* - [Prawira](https://github.com/PrawiraGenestonlia)
            

## Acknowledgments

* Xendit - HR
* David - Recruiter