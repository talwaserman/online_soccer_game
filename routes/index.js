var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome to soccer online' });
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

module.exports = router;
