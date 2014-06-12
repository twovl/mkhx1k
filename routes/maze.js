var mkhxServer = require('../mkhx-agent');

exports.show = function (req,res){
    var mapStageId = req.params.mapStageId;
    var remoteInfo = req.cookies.remoteInfo;
    mkhxServer.maze.show(remoteInfo.host, remoteInfo.sid, mapStageId, function (err, mazeInfo){
    	if(err){
            res.send(JSON.stringify(err));
        }
        else{
            res.send(JSON.stringify(mazeInfo));
        }
    });
};