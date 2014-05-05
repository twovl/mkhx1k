/**
 * Created by 亮 on 2014/4/28.
 */
var http = require('http');
var querystring = require('querystring');
var URL = require('url');
var commons = require('./commons.js');
var gameServerInfo = require('./gameServerInfo.js');
var deviceInfo = require('./deviceInfo.js');

//主服务器信息（用来验证用户信息，生成用户验证码和时间戳）
//var mainServer = 'http://bj.muhepp.com/pp/httpService.do';
var mainServer = {
    host:'bj.muhepp.com',
    path:'/pp/httpService.do',
    method:'POST',
    headers:new commons.commonHeaders()
};
//主服务器请求内容
var mainServerReqContent = JSON.stringify({
    callPara: {
        userPassword:"22706891",
        userName: "twovl",
        gameName: deviceInfo.gameName,
        udid: deviceInfo.udid,
        clientType: deviceInfo.clientType,
        releaseChannel: deviceInfo.releaseChannel,
        locale: deviceInfo.locale
    },
    serviceName: "login"
});
mainServer.headers['Content-Length']=mainServerReqContent.length;

var userInfo=null;
//登录主服务器，获得用户信息（验证信息、时间戳、服务器等）
var req = http.request(mainServer,function(res){
    res.setEncoding('utf8');
    res.on('data',function(data){
        userInfo = JSON.parse(data);
        userInfo.sid=res.headers['set-cookie'][0].split(/\W+/)[1];//获取cookie中的sid
        var loginReqContent=querystring.stringify({
            Udid: deviceInfo.udid,
            time: userInfo.returnObjs.timestamp,
            UserName:userInfo.returnObjs.userName,
            Origin: 'WP8',
            key: userInfo.returnObjs.key,
            Password: userInfo.returnObjs.U_ID,
            Devicetoken: ''
        });
        //游戏服务器
        var gameServer={
            host:URL.parse(userInfo.returnObjs.GS_IP).host,
            path:gameServerInfo.gameServerServices.passportLogin.path,
            method:gameServerInfo.gameServerServices.passportLogin.method,
            headers:{
                'UA-CPU': 'ARM',
                'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',
                'Content-Length':loginReqContent.length,
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Language': 'zh-CN',
               // 'Accept-Encoding': 'gzip, deflate',
                'Proxy-Connection': 'Keep-Alive'
            }
        };
        //登录游戏服务器
        var req=http.request(gameServer,function(res){
            res.setEncoding('utf8');
            console.log(res.headers);
            res.on('data',function(data){
                console.log(data);
            });
        });
        req.write(loginReqContent);
        req.end();
    });
});
req.write(mainServerReqContent);
req.end();




