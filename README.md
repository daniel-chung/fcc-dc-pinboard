
# Pinboard

Pinboard is a [Pinterest](https://www.pinterest.com/) clone. We attempt to 
recreate the functionalities of Pinterest.


## Demo

An up-to-date demo of Pinboard can be found on [heroku](http://fcc-dc-pinboard.herokuapp.com/).


## Setup

Once you have cloned the repo, here are the steps for starting up a local server.

First, start up a mongodb instance:
```sh
$ mongod
```

Then open up a separate terminal window. Run the following commands to install all npm dependencies, browserify our application, and start up a local server:
```sh
$ npm install
$ npm run build
$ npm start
```

## Setup dev

While the above method is an easy way to get started (and trigged when deployed to Heroku), we can add a few additional steps to speed up development.

Similar to above, start up a mongodb instance:
```sh
$ mongod
```

In a second terminal window run wachify, which will watch for any changes in our application files and rerun browserify. This can be invoked by running the following command:
```sh
$ npm run watch:bundle
```

Finally, in a third terminal window, start up our development local server. The following command will start up our server using nodemon, which will also watch for changes and restart our server:
```sh
$ npm run start:dev
```


## Tech stack

Pinboard is created using the following technologies and libraries:
- [Node.js](https://nodejs.org/en/)
- [express](http://expressjs.com/)
- [Angular](https://angularjs.org/)
- [Angular Route](https://docs.angularjs.org/api/ngRoute/service/$route)
- [Angular Material](https://material.angularjs.org/latest/)
- [Mongo DB](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com/)
- [Font Awesome](http://fontawesome.io/)
- [npm](https://www.npmjs.com/)
- [browserify](http://browserify.org/)
- [watchify](https://github.com/substack/watchify)


