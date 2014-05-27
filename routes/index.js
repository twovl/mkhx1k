
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
            req.session.userInfo = userInfo;
            var renderContent = {info:JSON.stringify(userInfo)};
            res.render('main',renderContent);
        }
    });
};
exports.mazeInfo = function(req,res){
    var mapStageId = req.params.mapStageId;
    mkhxServer.getMazeInfo(req.session.userInfo,mapStageId,function(err,mazeInfo){
        if(err){
            res.send(JSON.stringify(err));
        }
        else{
            res.send(JSON.stringify(mazeInfo));
        }
    });
};