var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome to the Ian Culverhouse game online!' });
});

router.get('/player_vs_computer_same_browser', function(req, res) {
  res.render('pvc', { title: 'Player VS Computer' });
});

router.get('/player_vs_player_same_browser', function(req, res) {
  res.render('pvp', { title: 'Player VS Computer' });
});

router.get('/player_vs_player_online', function(req, res) {
  res.render('pvp_online', { title: 'Player VS Player (Online)' });
});

router.get('/training', function(req, res) {
  res.render('training', { title: 'training' });
});

// router.get('/room_list', function(req, res) {
//   var rooms = req.app.get('rooms');
//   console.log('rooms:' + rooms);
//   res.send('room_list', rooms);
// });


module.exports = router;
