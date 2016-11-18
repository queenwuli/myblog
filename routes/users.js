var express = require('express');
var modals=require('../db/models')
var router = express.Router();
var utils=require('../utils');
var auth=require('../middleware/autoauth')

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/reg',auth.checkUnlogin, function(req, res, next) {
  res.render('user/reg')
});
//路径与上面访问注册页面的路径是一致的，只是是post方式
router.post('/reg',auth.checkUnlogin, function(req, res, next) {
  var user=req.body;
  if(user.password==user.repassword)
  {
    modals.User.findOne(
        {username:user.username},function(err,doc) {
          if(doc)
          {
            req.flash("error","用户名已存在，请重新注册！");
            res.redirect('/users/reg')
          }else{
            modals.User.create({username:user.username,password:utils.md5(""+user.password),email:user.email,avatar:'https://s.gravatar.com/avatar/'+utils.md5(user.email)+'?s=40'},function (err,doc) {
              if(err)
              {
                req.flash("error","注册失败，请稍后再试！");
                res.redirect('/users/reg');
              }else{
                req.flash("success","登录成功！");
                res.redirect("./login")
              }
            })
          }
        }
    )
  }else{
    req.flash("error","两次密码不一致！");
    res.redirect('/users/reg')
  }
});
router.get('/login',auth.checkUnlogin,  function(req, res, next) {
  res.render('user/login')
});
router.post('/login',auth.checkUnlogin, function(req, res, next) {
  var user=req.body;
  modals.User.findOne({username:user.username,password:utils.md5(""+user.password)},function (err,doc) {
    if(doc)
    {
      //重定向 是服务器端向客户端浏览器发出状态是301/302的响应码，告诉客户端浏览器要发出新的请求，地址是'/
      //也就是网站的根目录
      //A页面——>B页面——>C页面
      //转发 forward   A页面——》B页面——》C页面
      req.session.user=doc;
      req.flash("success","登录成功！");
      res.redirect("/");
    }else {
      req.flash("error","登录失败，用户名或密码错误！");
      res.redirect("/users/login")
    }
  })
});
router.get('/loginout',auth.checkLogin, function(req, res, next) {
  req.session.user=null;
  res.redirect('/')
});
module.exports = router;
