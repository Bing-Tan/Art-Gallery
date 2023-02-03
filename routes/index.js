var express = require('express');
var router = express.Router();
var db = require('../sql.js');
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
