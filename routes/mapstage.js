/**
 * Created by 亮 on 2014/11/11.
 */

var mkhxServer = require('../mkhx-agent');
exports.defend = function(req,res){
    var remoteInfo = req.cookies['remoteInfo'];
    mkhxServer.mapstage.defend(remoteInfo.host, remoteInfo.sid,function(err,results){
        res.send(JSON.stringify(err ? err : results));
    });
};