/**
 * Created by Administrator on 2016/11/18.
 */
exports.checkLogin=function (req,res,next) {
    if(req.session.user)
    {
        next()
    }else{
        res.redirect('/users/login');
    }
}
//检查用户没登录的
exports.checkUnlogin=function (req,res,next) {
    if(req.session.user)
    {
        res.redirect("/")
    }else{
        next();
    }
}