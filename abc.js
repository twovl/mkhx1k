/**
 * Created by 亮 on 2014/4/29.
 */
/**
 var querystring = require('querystring');
 console.log(
 querystring.parse('Udid=db2ca54b9751ac55e800c41e8a4ed91d&time=1398735434105&UserName=wangliang0&Origin=WP8&key=9050f453c1dc1d2ea31f7c5ac4c238ef&Password=1005103573&Devicetoken=')
 );
 */
var server = require('./server.js');
server.login('twovl','22706891',function(err,userInfo){
	if(err){
		console.log(err);
	}
	else{
		console.log(userInfo);
	}
});
