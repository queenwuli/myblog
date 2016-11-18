/**
 * Created by Administrator on 2016/11/17.
 */
var mongoose = require('mongoose');
var dbconfig = require('../dbconfig.js');
var ObjectId=mongoose.Schema.Types.ObjectId;
mongoose.connect(dbconfig.dburl);
var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:{type:String,default:''},
    avatar: {type: String},
    createTime:{type:Date,default:new Date().now}
});
var articleSchema=new mongoose.Schema({
    title:String,
    content:String,
    createTime:{type:Date,default:new Date().now},
    user:{type:ObjectId,ref:"userinfo"}
});
exports.User=mongoose.model('userinfo',userSchema);
exports.Article=mongoose.model('article',articleSchema);