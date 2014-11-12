/**
 * Created by 亮 on 2014/11/12.
 */

var mkhxServer = require('../mkhx-agent');

exports.sweep = function(req,res){
    var remoteInfo = req.cookies['remoteInfo'];
    mkhxServer.dungeon.sweep(remoteInfo.host, remoteInfo.sid,function(err,results){
        res.send(JSON.stringify(err ? err : results));
    });
};
