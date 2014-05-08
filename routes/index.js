
/*
 * GET home page.
 */

var mkhxServer = require('../mkhxServer.js');

exports.index = function(req, res){
  res.render('index');
};
exports.login = function(req,res){
    var username = req.body['username'];
    var password = req.body['password'];
    mkhxServer.login(username,password,function(err,userInfo){
        if(err){
            res.render('main',{info:err});
        }
        else{
            res.render('main',{info:JSON.stringify(userInfo)});
        }
    });
};