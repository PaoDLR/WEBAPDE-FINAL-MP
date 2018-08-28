/*
Author:
Delos Reyes, Paolo
McCarthy, Tadhg
Reyes, Alex
*/

const mongoose = require('./model/connectionBase').connection;

const express = require('express');
const server = express();

//load the needed libraries to connect to sessions
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const bodyParser = require('body-parser')
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

//connect the sessions with the mongoose connection. This will save the
//content on the server on its own schema.
server.use(session({
    secret: 'hotdawg',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 2 * 24 * 60 * 60,
      autoRemove: 'native'
    })
}));

server.set('view engine', 'ejs');

server.use(express.static(__dirname + '/public'));

//Insert other controllers here
const controllers = ['login','post','comment'];

for(var i = 0; i < controllers.length; i++){
  const mdl = require('./controller/'+ controllers[i] + 'Controller');
  mdl.Activate(server);
}

server.listen(process.env.PORT || 9090);
