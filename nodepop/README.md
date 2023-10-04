# Nodepop Engine

The Nodepop Engine is a server-side solution crafted using Node.js alongside Express. It serves as the backbone for a hypothetical product marketplace platform. Within this repository, you'll find the codebase and guidelines for deploying and operating the application across developmental and live setups.

## Install
Install dependencies:

```sh
$ npm install
```

Review database connection on /lib/connectMongoose.js (see "Start a MongoDB Server in MacOS or Linux")

Load initial data:

```sh
# this command deletes all the data in the database and create default data
$ npm run init-db
```

## Start

In production:

```sh
npm start
````

In development:

```sh
npm run dev
````
