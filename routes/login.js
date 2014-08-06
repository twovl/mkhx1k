var mkhxServer = require('../mkhx-agent');
var ulist = require('./user_white_black_list.json');
var llist = require('./legion_white_black_list.json')

exports.login = function (req,res){
    var username = req.body['username'];
    var password = req.body['password'];
    mkhxServer.login(username, password, function (err, passport){
        if(err){
           res.render('index',{info: err['returnMsg']});
           return;
        }
        mkhxServer.passportLogin(passport, function (err, userData){
            if (err) {
                res.render('index',{info: err['message']});
                return;
            }
            mkhxServer.legion.current(userData.host, userData.sid, function(err,legionInfo){
                if(err){
                    res.render('index',{info: err['message']});
                    return;
                }
                //判断军团黑白名单列表
                if(llist[legionInfo['LegionName']]
                    ||//判断用户名黑白名单列表
                    ulist[username]){
                    res.cookie('remoteInfo', {
                        'sid':userData.sid,
                        'host':userData.host
                    }, {maxAge: 1000*60*60*24*30, httpOnly: true});
                    res.redirect('/main');
                }
                else {
                    res.render('index',{info:'本工具仅限小伙伴内部使用！'});
                }
            });
        });
    });
};

exports.logout = function (req,res){
    res.clearCookie('remoteInfo');
    res.redirect('/index');
};