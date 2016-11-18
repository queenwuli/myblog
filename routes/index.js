var express = require('express');
var modals=require('../db/models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  modals.Article.find({}).populate('user').exec(function (err,article) {
    res.render('index', { title: 'myblog' ,article:article});
  })
});

module.exports = router;
