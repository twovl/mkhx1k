/**
 * Created by 亮 on 2014/4/29.
 */
var server = require('./server.js');
server.login('twovl','12345678',function(err,userInfo){
	if(err){
		console.log(err);
	}
	else{
		console.log(userInfo);
	}
});
