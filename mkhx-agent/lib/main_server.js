var http = require('http');
var commons = require('./commons');

/**
 * 登录主服务器，获取通行证等信息
 * @param {String} username 用户名
 * @param {String} password 密码
 * @param {Function} callback function(err,passport) passport为主服务器返回的用于登录game_server的信息
 */
exports.login = function (username, password, callback){
    //1、初始化主服务器信息
    //主服务器信息（用来验证用户信息，生成用户验证码和时间戳）
    //var server = 'http://bj.muhepp.com/pp/httpService.do';
    var server = {
        host:'bj.muhepp.com',
        path:'/pp/httpService.do',
        method:'POST',
        headers:commons.headers()
    };
    //主服务器请求内容
    var reqContent = {
        callPara:commons.deviceInfo(),
        serviceName: "login"
    };
    reqContent.callPara.userName = username;
    reqContent.callPara.userPassword = password;
    reqContent = JSON.stringify(reqContent);
    server.headers['Content-Length'] = reqContent.length;
    //2、登录主服务器，验证用户，获取用户信息（验证信息、时间戳、所在服务器等）
    var req = http.request(server,function(res){
        res.setEncoding('utf8');
        res.on('data',function(data) {
            if(data){
                //有登录返回数据
                /**
                data结构
                {   returnCode: '0',
                    returnMsg: 'No error.',
                    returnObjs:
                       { GS_NAME: 'wp8_server01',
                         GS_IP: 'http://s1.wp.mysticalcard.com/',
                         friendCode: 'null',
                         GS_ID: '1********3',
                         GS_PORT: '80',
                         timestamp: '1399296928765',
                         GS_CHAT_PORT: '8000',
                         source: 'username',
                         LOGIN_TYPE: '[]',
                         userName: 'username',
                         GS_DESC: '银月港',
                         U_ID: '1005090199',
                         key: 'a8e*************************da',
                         G_TYPE: '1',
                         uEmailState: '0',
                         GS_CHAT_IP: '218.245.7.118',
                         initialUName: 'username' 
                        },
                    }
                */
                data = JSON.parse(data);
                if(data.returnCode=='0'){
                    //登录成功
                    callback(null,data.returnObjs);
                }
                else{
                //登录失败
                    callback(data,null);
                }
            }
            else{
                //无登录返回数据
                callback('服务器无响应',null);
            }
        });
    });
    req.write(reqContent);
    req.end();
};