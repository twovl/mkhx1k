var mkhxServer = require('../mkhx-agent');

exports.show = function (req,res){
    var mapStageId = req.params.mapStageId;
    var remoteInfo = req.cookies.remoteInfo;
    mkhxServer.maze.show(remoteInfo.host, remoteInfo.sid, mapStageId, function (err, mazeInfo){
        res.send(JSON.stringify(err ? err : mazeInfo));
    });
};
exports.infos = function(req, res){
    var mapStageId = req.params.mapStageId;
    var remoteInfo = req.cookies.remoteInfo;
    mkhxServer.maze.infos(remoteInfo.host, remoteInfo.sid, mapStageId, function (err, mazeInfos){
        res.send(JSON.stringify(err ? err : mazeInfos));
    });
};
exports.battle = function(req, res){
    var mapStageId = req.params.mapStageId;
    var layer = req.params.layer;
    var itemIndex = req.params.itemIndex;
    var manual = req.params.manual;
    var remoteInfo = req.cookies.remoteInfo;
    mkhxServer.maze.battle(
        remoteInfo.host,
        remoteInfo.sid,
        mapStageId, layer,
        itemIndex, manual,
        function (err, battleResult){
            res.send(JSON.stringify(err ? err : battleResult));
        }
    );
};