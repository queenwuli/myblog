var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add', function(req, res, next) {
  res.render('article/add');
});
// router.get('/view', function(req, res, next) {
//   res.send('查看文章');
// });
module.exports = router;
