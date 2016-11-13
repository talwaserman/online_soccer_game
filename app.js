
//socket io vars
 var connected_users = {};

var express = require('express');
var io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();

// Socket.io
var io           = io();
app.io           = io;

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

//web sockets
io.on('connection', function(socket){
  connected_users[socket.id] = {};
  connected_users[socket.id]['socket'] = socket;
  console.log('a user connected!');
  var allkeys = Object.keys(socket);
  for (var i = 0; i < allkeys.length; i ++) {
    console.log(allkeys[i] + ": " + socket[allkeys[i]]);
  }
  console.log('----client----');
  var allkeys = Object.keys(socket.client);
  for (var i = 0; i < allkeys.length; i ++) {
    console.log(allkeys[i] + ": " + socket.client[allkeys[i]]);
  }

  console.log('----rooms----');
  var allkeys = Object.keys(socket.rooms);
  for (var i = 0; i < allkeys.length; i ++) {
    console.log(allkeys[i] + ": " + socket.rooms[allkeys[i]]);
  }

  socket.on('disconnect', function(){
    console.log('user disconnected');


    console.log('----how many users connected: ----');
    console.log('number: ' + Object.keys(connected_users).length);

    io.to(connected_users[socket.id]['room']).emit('message', {
      'message' : 'user_left_room',
      'data': socket.id
    });
    delete connected_users[socket.id];

  });

  socket.on('create', function (gameInfo) {
    socket.join(gameInfo.gameName);
    console.log('room ' + gameInfo.gameName + ' was created.');
    connected_users[socket.id]['room'] = gameInfo.gameName;
    connected_users[socket.id]['playerName'] = gameInfo.playerName
    io.to(socket.id).emit('message', {
      'message' : 'room_created',
      'data': gameInfo
    });
  });

  socket.on('join_room', function(gameInfo) {
    socket.join(gameInfo.gameName);
    connected_users[socket.id]['room'] = gameInfo.gameName;
    connected_users[socket.id]['playerName'] = gameInfo.playerName
    io.to(socket.id).emit('message', {
      'message' : 'join_room',
      'data': gameInfo
    });

    // sending to all clients in 'game' room(channel) except sender
    socket.broadcast.to(gameInfo.gameName).emit('message', {
      'message' : 'player_joined',
      'data': gameInfo
    });

  });

  console.log('----how many users connected: ----');
  console.log('number: ' + Object.keys(connected_users).length);

});


module.exports = app;
