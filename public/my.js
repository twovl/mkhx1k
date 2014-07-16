
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
        dataType: 'json',
        url: '/maze/battle',
        success: function(data){rtnData = data;}
    });
    return rtnData;
}
function syncMazeBattleAll(mapStageId){
    var output = $('dl#info');
    output.append('<h3 style="color:green;">--------------开始全刷' + mapStageId + '塔-------------</h3>');
    var layer = 1;
    var layerCount = 1;
    var layerInfo = syncMazeInfo(mapStageId,layer);
    var battleResult = null;
    output.append('<li>--------------开始刷第' + layer + '层-------------</li>');
    if(layerInfo){
        layerCount = layerInfo['TotalLayer'];
        //战斗第一层
        //获取宝箱和怪物信息
        for(var i = 0; i<layerInfo['Map']['Items'].length; i++){
            battleResult = null;
            switch(layerInfo['Map']['Items'][i]){
                case 2://宝箱
                case 3://怪物
                    battleResult = syncMazeBattle(mapStageId,layer,i,0);
                    break;
                case 5://楼梯
                    if(!layerInfo['Map']['IsFinish']){
                        battleResult = syncMazeBattle(mapStageId,layer,i,0);
                    }
                    break;
            }
            if(battleResult){
            //输出战斗结果
                output.append('<li>'+JSON.stringify(battleResult)+'</li>');
                if(battleResult['Win']!=1){
                    output.append('<li>战斗失败，刷塔结束。</li>');
                    $('#consoleLog').scrollTop(output.height());
                    return;
                }
            }
        }

        //循环战斗每一层
        for(++layer;layer <= layerCount; layer++){
            layerInfo = syncMazeInfo(mapStageId,layer);
            output.append('<li>--------------开始刷第' + layer + '层-------------</li>');
            if(layerInfo) {
                //获取宝箱和怪物信息
                for (var i = 0; i < layerInfo['Map']['Items'].length; i++) {
                    battleResult = null;
                    switch (layerInfo['Map']['Items'][i]) {
                        case 2://宝箱
                        case 3://怪物
                            battleResult = syncMazeBattle(mapStageId, layer, i, 0);
                            break;
                        case 5://楼梯
                            if (!layerInfo['Map']['IsFinish']) {
                                battleResult = syncMazeBattle(mapStageId, layer, i, 0);
                            }
                            break;
                    }
                    if (battleResult) {
                        //输出战斗结果
                        output.append('<li>' + JSON.stringify(battleResult) + '</li>');
                        if (battleResult['Win']!=1) {
                            output.append('<li>战斗失败，刷塔结束。</li>');
                            $('#consoleLog').scrollTop(output.height());
                            return;
                        }
                    }
                }
            }
            else {
                output.append('<li>--------------获取' + layer + '层信息错误，刷塔结束-------------</li>');
                $('#consoleLog').scrollTop(output.height());
                return;
            }
        }
        output.append('<h3 style="color:green;">--------------刷塔结束-------------</h3>');
    }
    else {
        output.append('<li>--------------获取' + layer + '层信息错误，刷塔结束-------------</li>');
    }
    $('#consoleLog').scrollTop(output.height());
}
function syncMazeBattleBox(mapStageId){
    var output = $('dl#info');
    output.append('<h3 style="color:green;">--------------开始全刷' + mapStageId + '塔箱子-------------</h3>');
    var layer = 1;
    var layerCount = 1;
    var layerInfo = syncMazeInfo(mapStageId,layer);
    var battleResult = null;
    output.append('<li>--------------开始刷第' + layer + '层-------------</li>');
    if(layerInfo){
        layerCount = layerInfo['TotalLayer'];
        //战斗第一层
        //获取宝箱和怪物信息
        for(var i = 0; i<layerInfo['Map']['Items'].length; i++){
            battleResult = null;
            switch(layerInfo['Map']['Items'][i]){
                case 2://宝箱
                    battleResult = syncMazeBattle(mapStageId,layer,i,0);
                    break;
                case 3://怪物
                    break;
                case 5://楼梯
                    if(!layerInfo['Map']['IsFinish']){
                        battleResult = syncMazeBattle(mapStageId,layer,i,0);
                    }
                    break;
            }
            if(battleResult){
                //输出战斗结果
                output.append('<li>'+JSON.stringify(battleResult)+'</li>');
                if(battleResult['Win']!=1){
                    output.append('<li>战斗失败，刷塔结束。</li>');
                    $('#consoleLog').scrollTop(output.height());
                    return;
                }
            }
        }

        //循环战斗每一层
        for(++layer;layer <= layerCount; layer++){
            layerInfo = syncMazeInfo(mapStageId,layer);
            output.append('<li>--------------开始刷第' + layer + '层-------------</li>');
            if(layerInfo) {
                //获取宝箱和怪物信息
                for (var i = 0; i < layerInfo['Map']['Items'].length; i++) {
                    battleResult = null;
                    switch (layerInfo['Map']['Items'][i]) {
                        case 2://宝箱
                            battleResult = syncMazeBattle(mapStageId, layer, i, 0);
                            break;
                        case 3://怪物
                            break;
                        case 5://楼梯
                            if (!layerInfo['Map']['IsFinish']) {
                                battleResult = syncMazeBattle(mapStageId, layer, i, 0);
                            }
                            break;
                    }
                    if (battleResult) {
                        //输出战斗结果
                        output.append('<li>' + JSON.stringify(battleResult) + '</li>');
                        if (battleResult['Win']!=1) {
                            output.append('<li>战斗失败，刷塔结束。</li>');
                            $('#consoleLog').scrollTop(output.height());
                            return;
                        }
                    }
                }
            }
            else {
                output.append('<li>--------------获取' + layer + '层信息错误，刷塔结束-------------</li>');
                $('#consoleLog').scrollTop(output.height());
                return;
            }
        }
        output.append('<h3 style="color:green;">--------------刷塔结束-------------</h3>');
    }
    else {
        output.append('<li>--------------获取' + layer + '层信息错误，刷塔结束-------------</li>');
    }
    $('#consoleLog').scrollTop(output.height());
}
function mazeShow(mapStageId) {
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
    var output = $('dl#info');
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
function mazeReset(mapStageId){
    //TODO
}