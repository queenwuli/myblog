var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/reg', function(req, res, next) {
  res.render('user/reg')
});
router.get('/login', function(req, res, next) {
  res.render('user/login')
});
module.exports = router;
