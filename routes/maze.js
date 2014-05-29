var mkhxServer = require('../mkhx-agent');

exports.info = function (req,res){
    var mapStageId = req.params.mapStageId;
    var userData = req.session.userData;
    mkhxServer.maze.show(userData.host, userData.sid, mapStageId, function (err, mazeInfo){
    	if(err){
            res.send(JSON.stringify(err));
        }
        else{
            res.send(JSON.stringify(mazeInfo));
        }
    });
};