var login = require('./login');
var maze = require('./maze');

module.exports = function(app){

    //登录，成功后重定向至main
    app.all('/', function (req, res) {
        res.redirect('index');
    });
    app.all('/index', function (req, res) {
        var remoteInfo = req.cookies['remoteInfo'];
        if (remoteInfo && remoteInfo.host && remoteInfo.sid) {
            res.redirect('main');
        }
        else {
            res.render('index');
        }
    });
    app.get('/login', function (req, res) {
        res.redirect('index');
    });
    app.post('/login', login);

    //登录首页
    app.all('*', function (req, res, next) {
        var remoteInfo = req.cookies['remoteInfo'];
        if (remoteInfo && remoteInfo.host && remoteInfo.sid) {
            next();
        }
        else {
            res.redirect('index');
        }
    });
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
    //TODO

};
