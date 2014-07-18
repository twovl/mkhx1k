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
        success: function (data) {
            rtnData = data;
        }
    });
    return rtnData;
}
function syncMazeBattleAll(mapStageId) {
    var output = $('div#logContent');
    output.append('<h3 style="color:green;">--------------开始全刷' + mapStageId + '塔-------------</h3>');
    var layer = 1;
    var layerCount = 1;
    var layerInfo = syncMazeInfo(mapStageId, layer);
    var battleResult = null;
    output.append('<li>--------------开始刷第' + layer + '层-------------</li>');
    if (layerInfo) {
        if (layerInfo.status) {
            layerCount = layerInfo['TotalLayer'];
            //战斗第一层
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
                    if (battleResult['Win'] != 1) {
                        output.append('<li>战斗失败，刷塔结束。</li>');
                        $('#consoleLog').scrollTop(output.height());
                        mazeShow(mapStageId);
                        userInfo();
                        return;
                    }
                }
            }

            //循环战斗每一层
            for (++layer; layer <= layerCount; layer++) {
                layerInfo = syncMazeInfo(mapStageId, layer);
                output.append('<li>--------------开始刷第' + layer + '层-------------</li>');
                if (layerInfo) {
                    if (layerInfo.status) {
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
                                if (battleResult['Win'] != 1) {
                                    output.append('<li>战斗失败，刷塔结束。</li>');
                                    $('#consoleLog').scrollTop(output.height());
                                    mazeShow(mapStageId);
                                    userInfo();
                                    return;
                                }
                            }
                        }
                    }
                    else {
                        output.append('获取' + layer + '层信息错误，刷塔结束：' + layerInfo.message + '<br/>');
                        mazeShow(mapStageId);
                        userInfo();
                        return;
                    }
                }
                else {
                    output.append('-->获取' + layer + '层信息错误，刷塔结束：服务器无响应<br/>');
                    mazeShow(mapStageId);
                    userInfo();
                    return;
                }
            }
            output.append('<h3 style="color:green;">--------------刷塔结束-------------</h3>');
        }
        else {
            output.append('-->获取' + layer + '层信息错误，刷塔结束：' + layerInfo.message + '<br/>');
        }
    }
    else {
        output.append('-->获取' + layer + '层信息错误，刷塔结束:服务器无响应<br/>');
    }
    mazeShow(mapStageId);
    userInfo();
    $('#consoleLog').scrollTop(output.height());
}
function syncMazeBattleBox(mapStageId) {
    var output = $('div#logContent');
    output.append('<h3 style="color:green;">--------------开始全刷' + mapStageId + '塔箱子-------------</h3>');
    var layer = 1;
    var layerCount = 1;
    var layerInfo = syncMazeInfo(mapStageId, layer);
    var battleResult = null;
    output.append('<li>--------------开始刷第' + layer + '层-------------</li>');
    if (layerInfo) {
        if (layerInfo.status) {
            layerCount = layerInfo['TotalLayer'];
            //战斗第一层
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
                    if (battleResult['Win'] != 1) {
                        output.append('<li>战斗失败，刷塔结束。</li>');
                        $('#consoleLog').scrollTop(output.height());
                        mazeShow(mapStageId);
                        userInfo();
                        return;
                    }
                }
            }

            //循环战斗每一层
            for (++layer; layer <= layerCount; layer++) {
                layerInfo = syncMazeInfo(mapStageId, layer);
                output.append('<li>--------------开始刷第' + layer + '层-------------</li>');
                if (layerInfo) {
                    if (layerInfo.status) {
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
                                if (battleResult['Win'] != 1) {
                                    output.append('<li>战斗失败，刷塔结束。</li>');
                                    $('#consoleLog').scrollTop(output.height());
                                    mazeShow(mapStageId);
                                    userInfo();
                                    return;
                                }
                            }
                        }
                    }
                    else {
                        output.append('获取' + layer + '层信息错误，刷塔结束：' + layerInfo.message + '<br/>');
                        mazeShow(mapStageId);
                        userInfo();
                        return;
                    }
                }
                else {
                    output.append('-->获取' + layer + '层信息错误，刷塔结束:服务器无响应<br/>');
                    $('#consoleLog').scrollTop(output.height());
                    mazeShow(mapStageId);
                    userInfo();
                    return;
                }
            }
            output.append('<h3 style="color:green;">--------------刷塔结束-------------</h3>');
        }
        else {
            output.append('获取' + layer + '层信息错误，刷塔结束：' + layerInfo.message + '<br/>');
        }
    }

    else {
        output.append('-->获取' + layer + '层信息错误，刷塔结束:服务器无响应<br/>');
    }
    mazeShow(mapStageId);
    userInfo();
    $('#consoleLog').scrollTop(output.height());
}
function mazeShow(mapStageId) {
    var output = $('div#logContent');
    //output.append('加载' + mapStageId + '塔信息<br/>');
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'json',
        url: '/maze/show/' + mapStageId,
        success: function (data) {
            if (data.status) {
                $('#lblMazeName' + mapStageId).text(data.Name);
                $('#lblMazeIsCleared' + mapStageId).text(data.Clear);
                $('#lblMazeFreeReset' + mapStageId).text(data.FreeReset);
                $('#lblMazeResetCash' + mapStageId).text(data.ResetCash);
                //output.append('-->加载' + mapStageId + '塔信息成功<br/>');
            }
            else {
                output.append('-->加载' + mapStageId + '塔信息失败：' + data.message + '<br/>');
            }
            $('#consoleLog').scrollTop(output.height());
        },
        error: function (xmlHttpReq, errMsg) {
            errMsg = '-->加载' + mapStageId + '塔信息：服务器无响应' + (errMsg ? errMsg : '') + '<br/>';
            var output = $('div#logContent');
            output.append(errMsg);
            $('#consoleLog').scrollTop(output.height());
        }
    });

    $.get("/maze/show/" + mapStageId, function (data) {
        data = JSON.parse(data);
        $('#lblMazeName' + mapStageId).text(data.Name);
        $('#lblMazeIsCleared' + mapStageId).text(data.Clear);
        $('#lblMazeFreeReset' + mapStageId).text(data.FreeReset);
        $('#lblMazeResetCash' + mapStageId).text(data.ResetCash);
    });
    $('#consoleLog').scrollTop(output.height());
}
function syncMazeInfo(mapStageId, layer) {
    var rtnData = null;
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: '/maze/info/' + mapStageId + '/' + layer,
        success: function (data) {
            rtnData = data;
        }
    });
    return rtnData;
}
function mazeInfos(mapStageId) {
    var output = $('div#logContent');
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/maze/infos/' + mapStageId,
        success: function (data) {
            output.append('<h3 style="color:green;">--------------' + mapStageId + '迷宫信息-------------</h3>');
            for (var i in data) {
                output.append(
                        '<dt>' + i + ':</dt>' +
                        '<dd>' + JSON.stringify(data[i]) + '</dd>');
                $('#consoleLog').scrollTop(output.height());
            }
        },
        error: function (xmlHttpReq, errMsg) {
            errMsg = '-->查询' + mapStageId + '塔信息：服务器无响应' + (errMsg ? errMsg : '') + '<br/>';
            var output = $('div#logContent');
            output.append(errMsg);
            $('#consoleLog').scrollTop(output.height());
        }
    });
}
function mazeReset(mapStageId) {
    if ($('#lblMazeFreeReset' + mapStageId).text() === '0') {
        if (!window.confirm('没有免费重置次数，你确定要花钻重置？')) {
            return;
        }
    }
    $.ajax({
        async: true,
        type: 'PUT',
        dataType: 'json',
        url: '/maze/reset/' + mapStageId,
        success: function (data) {
            var output = $('div#logContent');
            if (data.status) {
                output.append('-->重置' + mapStageId + '塔成功<br/>');
            }
            else {
                output.append('-->重置' + mapStageId + '塔失败：' + data.message + '<br/>');
            }
            $('#consoleLog').scrollTop(output.height());
            mazeShow(mapStageId);
        },
        error: function (xmlHttpReq, errMsg) {
            errMsg = '-->重置' + mapStageId + '塔：服务器无响应：' + (errMsg ? errMsg : '') + '<br/>';
            var output = $('div#logContent');
            output.append(errMsg);
            $('#consoleLog').scrollTop(output.height());
        }
    });
}
function userInfo(){
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'json',
        url: '/user/info',
        success: function (data) {
            var output = $('div#logContent');
            if (data.status) {
                $('#username').text(data['UserName']);
                $('#nickname').text(data['NickName']);
                $('#level').text(data['Level']);
                $('#coins').text(data['Coins']);
                $('#cash').text(data['Cash']);
                $('#energy').text(data['Energy']);
            }
            else {
                output.append('-->获取用户信息失败：' + data.message + '<br/>');
            }
            $('#consoleLog').scrollTop(output.height());
        },
        error: function (xmlHttpReq, errMsg) {
            errMsg = '-->获取用户信息：服务器无响应：' + (errMsg ? errMsg : '') + '<br/>';
            var output = $('div#logContent');
            output.append(errMsg);
            $('#consoleLog').scrollTop(output.height());
        }
    });
}