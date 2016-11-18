var express = require('express');
var auth=require('../middleware/autoauth')
var router = express.Router();
var modals=require('../db/models')
var utils=require('../utils');

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add',auth.checkLogin, function(req, res, next) {
  res.render('article/add');
});
router.post('/add',auth.checkLogin, function(req, res, next) {
  var article=req.body;
  modals.Article.create({title:article.title,content:article.content,user:req.session.user_id},function (err,doc) {
    if(err)
    {
      req.flash("error","发布失败");
      res.redirect("/article/add")
    }else{
      req.flash("success","发布成功");
      res.redirect('/')
    }
  })
});
// router.get('/view', function(req, res, next) {
//   res.send('查看文章');
// });
module.exports = router;
