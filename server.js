/**
 * Created by 亮 on 2014/4/30.
 */
var http = require('http');
var querystring = require('querystring');
var URL = require('url');
var commons = require('./commons.js');
var deviceInfo = require('./deviceInfo.js');

/**
 *
 * @param username
 * @param password
 * @param callback function(err,userInfo),userInfo为用户访问服务器的接口
 */
exports.login = function(username,password,callback){
    //1、初始化主服务器信息
    //主服务器信息（用来验证用户信息，生成用户验证码和时间戳）
    //var mainServer = 'http://bj.muhepp.com/pp/httpService.do';
    var mainServer = {
        host:'bj.muhepp.com',
        path:'/pp/httpService.do',
        method:'POST',
        headers:commons.commonHeaders()
    };
    //主服务器请求内容
    var mainServerReqContent = {
        callPara:commons.commonDeviceInfo(),
        serviceName: "login"
    };
    mainServerReqContent.callPara.userName = username;
    mainServerReqContent.callPara.userPassword = password;
    mainServerReqContent = JSON.stringify(mainServerReqContent);
    mainServer.headers['Content-Length']=mainServerReqContent.length;

    //2、登录主服务器，验证用户，获取用户信息（验证信息、时间戳、所在服务器等）
    var req = http.request(mainServer,function(res){
        res.setEncoding('utf8');
        res.on('data',function(data) {
            if(data)
            var userInfo = JSON.parse(data);
            userInfo.sid = res.headers['set-cookie'][0].split(/\W+/)[1];//获取cookie中的sid
            console.log(userInfo);
        });
    });
    req.write(mainServerReqContent);
    req.end();
};