var mkhxServer = require('../mkhx-agent');

exports.info = function(req,res){
    var remoteInfo = req.cookies['remoteInfo'];
    mkhxServer.user.info(remoteInfo.host, remoteInfo.sid, true, function (err, info) {
        res.send(JSON.stringify(err ? err : info));
    });
};