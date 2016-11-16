var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/add', function(req, res, next) {
  res.send('添加文章');
});
router.get('/view', function(req, res, next) {
  res.send('查看文章');
});
module.exports = router;
