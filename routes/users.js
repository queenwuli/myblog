var express = require('express');
var modals=require('../db/models')
var router = express.Router();
var utils=require('../utils');

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/reg', function(req, res, next) {
  res.render('user/reg')
});
//路径与上面访问注册页面的路径是一致的，只是是post方式
router.post('/reg', function(req, res, next) {
  var user=req.body;
  if(user.pwd==user.pwd2)
  {
    modals.User.findOne(
        {username:user.username},function(err,doc) {
          if(err)
          {

          }else{
            modals.User.create({username:user.username,password:utils.md5(""+user.pwd),email:user.email},function (err,doc) {
              if(err)
              {

              }else{
                res.redirect("./login")
              }
            })
          }
        }
    )
  }else{

  }
});
router.get('/login', function(req, res, next) {
  res.render('user/login')
});
router.post('/login', function(req, res, next) {
  var user=req.body;
  modals.User.findOne({username:user.username,password:utils.md5(""+user.pwd)},function (err,doc) {
    if(doc)
    {
      res.redirect("/")
    }else {
      res.redirect("/users/login")
    }
  })
});
router.get('/loginout', function(req, res, next) {
  res.render('user/loginout')
});
module.exports = router;
