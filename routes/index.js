var login = require('./login.js');
var maze = require('./maze.js');
var user = require('./user.js');
var mapstage = require('./mapstage.js');
var dungeon = require('./dungeon.js');

module.exports = function(app){

    //登陆前
    //登录，成功后重定向至main
    app.all('/', function (req, res) {
        res.redirect('/index');
    });
    app.all('/index', function (req, res) {
        var remoteInfo = req.cookies['remoteInfo'];
        if (remoteInfo && remoteInfo.host && remoteInfo.sid) {
            res.redirect('/main');
        }
        else {
            res.render('index');
        }
    });
    app.post('/login',login.login);

    //判断是否登陆，如果没登陆，不返回任何数据
    app.use(function (req, res, next) {
        var remoteInfo = req.cookies['remoteInfo'];
        if (remoteInfo && remoteInfo.host && remoteInfo.sid) {
            next();
        }
        else {
            //res.redirect('/index');
            res.send(404,'Holly Shit, we cannot find that!');
            console.log('%s - %s %s %d - - %s',req.ip,req.method,req.originalUrl,404, new Date().toUTCString());
        }
    });

    //登录后的判断
    app.get('/logout',login.logout);
    //主界面
    app.get('/main', function(req, res){
        res.render('main');
    });

    //服务，获取迷宫信息json串
    app.get('/maze/show/:mapStageId(\\d+)',maze.show);
    //服务，获取迷宫对应层信息json串
    app.get('/maze/info/:mapStageId(\\d+)/:layer(\\d+)',maze.info);
    //服务，获取迷宫所有层信息json串
    app.get('/maze/infos/:mapStageId(\\d+)',maze.infos);

    //服务，战斗迷宫中某一层的某一个index
    //mapStageId
    //layer
    //itemIndex
    //manual
    app.post('/maze/battle',maze.battle);

    //服务，重置迷宫
    app.put('/maze/reset/:mapStageId(\\d+)',maze.reset);

    //服务，获取游戏角色信息
    app.get('/user/info',user.info);


    //清除地图入侵
    app.get('/mapstage/defend',mapstage.defend);

    //扫荡地宫
    app.get('/dungeon/sweep',dungeon.sweep);
};
