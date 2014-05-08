/**
 * Created by 亮 on 2014/4/30.
 */
var http = require('http');
var querystring = require('querystring');
var URL = require('url');
var commons = require('./commons.js');
var gameServerServices = require('./gameServerServices.js');

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
            if(data){
			//有登录返回数据
			/*
			data结构
			{ 	returnCode: '0',
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
					var userInfo = data.returnObjs;
					userInfo.sid = res.headers['set-cookie'][0].split(/\W+/)[1];//获取cookie中的sid
					userInfo.mainServer = mainServer;
					
	//3、登录用户所在的游戏服务器
					//游戏服务器
					var gameServer={
						host:URL.parse(userInfo.GS_IP).host,
						path:gameServerServices.passportLogin.path,
						method:gameServerServices.passportLogin.method,
						headers:commons.commonHeaders()
					};
					//游戏服务器请求内容
					var gameServerLoginReqContent = querystring.stringify({
						Udid: commons.commonDeviceInfo.udid,
						time: userInfo.timestamp,
						UserName:userInfo.userName,
						Origin: 'WP8',
						key: userInfo.key,
						Password: userInfo.U_ID,
						Devicetoken: ''
					});
					gameServer.headers['Content-Length'] = gameServerLoginReqContent.length;
					var req = http.request(gameServer,function(res){
						res.setEncoding('utf8');
						res.on('data',function(data){
                            //登录成功
							//TODO
							callback(null,userInfo);
						});
					});
					req.write(gameServerLoginReqContent);
					req.end();
				}
				else{
				//登录失败
					callback(data.returnMsg,null);
				}
			}
			else{
			//无登录返回数据
				callback('服务器无响应',null);
			}
        });
    });
    req.write(mainServerReqContent);
    req.end();
};