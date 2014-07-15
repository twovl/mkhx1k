var output = $('dl#info');
function syncMazeBattle(mapStageId, layer, itemIndex, manual) {
    var rtnData = null;
    $.ajax({
        async: false,
        type: 'POST',
        data: {
            mapStageId: mapStageId,
            layer: layer,
            itemIndex: itemIndex,
            manual: manual
        },
        dataType: 'html',
        url: '/maze/battle',
        success: function(data){rtnData = data;}
    });
    return rtnData;
};
function syncMazeBattleAll(mapStageId){
    output.append('<h3 style="color:green;">--------------开始全刷' + mapStageId + '塔-------------</h3>');

    var layer = 1;
    var layerCount = 1;
    var layerInfo = syncMazeInfo(mapStageId,layer);
    if(layerInfo){
        layerCount = layerInfo['TotalLayer'];
        //TODO 战斗第一层
        //TODO 输出战斗结果
        for(;layer <= layerCount; layer++){
            layerInfo = syncMazeInfo(mapStageId,layer);

            //TODO 战斗每一层
            //TODO 输出每次战斗结果
        }
    }
    else {
        output.append('<h3 style="color:green;">--------------获取' + layer + '层信息错误，刷塔结束-------------</h3>');
    }
}
function syncMazeBattleBox(mapStageId){
    //TODO 只打箱子
}
function mapShow(mapStageId) {
    $.get("/maze/show/" + mapStageId, function (data) {
        data = JSON.parse(data);
        $('#lblMazeName' + mapStageId).text(data.Name);
        $('#lblMazeIsCleared' + mapStageId).text(data.Clear);
        $('#lblMazeFreeReset' + mapStageId).text(data.FreeReset);
        $('#lblMazeResetCash' + mapStageId).text(data.ResetCash);
    });
}
function syncMazeInfo(mapStageId, layer){
    var rtnData = null;
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: '/maze/info/'+mapStageId+'/'+layer,
        success: function(data){rtnData = data;}
    });
    return rtnData;
}
function mazeInfos(mapStageId) {
    $.get('/maze/infos/' + mapStageId, function (data) {
        output.append('<h3 style="color:green;">--------------' + mapStageId + '迷宫信息-------------</h3>');
        data = JSON.parse(data);
        for (var i in data) {
            $('#info').append(
                    '<dt>' + i + ':</dt>' +
                    '<dd>' + JSON.stringify(data[i]) + '</dd>');
        }
        $('#consoleLog').scrollTop(output.height());
    });
}