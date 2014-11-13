function asyncDungeonSweep(){
    var output = $('div#logContent');
    output.append('<h3 style="color:green;">--------------开始扫荡地下城-------------</h3>');
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: '/dungeon/sweep',
        success: function (data) {
            if(data.status){
                var award = data['Award'];
                var message =
                    '金币×'+award['Coins']+' '+
                    '经验×'+award['Exp']+' '+
                    '怒气×'+award['Anger']+'<br/>';
                var cards = award['Cards'];
                var chips = award['Chips'];
                if(cards!==undefined){
                    message+='-->获得卡牌：<br/>';
                    cards.forEach(function(card){
                        message += card['CardName']+'×'+card['Num']+'<br/>';
                    });
                }
                if(chips!==undefined){
                    message+='-->获得碎片：<br/>';
                    chips.forEach(function(chip){
                        message += chip['CardName']+'×'+chip['Num']+'<br/>';
                    });
                }
                output.append(message);
            }
            else{
                output.append('-->'+data.message+ '<br/>');
            }
            $('#consoleLog').scrollTop(output.height());
        },
        error: function (xmlHttpReq, errMsg) {
            errMsg = '-->扫荡：服务器无响应：' + (errMsg ? errMsg : '') + '<br/>';
            output.append(errMsg);
            $('#consoleLog').scrollTop(output.height());
        }
    });
}

function asyncMapstageDefend(){
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: '/mapstage/defend',
        success: function (data) {
            var output = $('div#logContent');
            if(data.status){
                for(var d in data.data){
                    output.append('-->'+data.data[d][0]+'   '+data.data[d][1]+ '<br/>');
                }
            }
            else{
                output.append('-->'+data.message+ '<br/>');
            }
            $('#consoleLog').scrollTop(output.height());
        },
        error: function (xmlHttpReq, errMsg) {
            errMsg = '-->战斗：服务器无响应：' + (errMsg ? errMsg : '') + '<br/>';
            var output = $('div#logContent');
            output.append(errMsg);
            $('#consoleLog').scrollTop(output.height());
        }
    });
}
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
function decodeBattleResult(br){
    var rt = {};
    if(br){
        if(br.status){
            rt.status = 1;
            var award = br['ExtData']['Award'];
            var clear = br['ExtData']['Clear'];
            var cardChip =  br['ExtData']['CardChip'];
            rt.message =
                '金币×'+award['Coins']+' '+
                '经验×'+award['Exp'];
            if(br['Win']===1){
                rt.win = 1;
                if(award['CardId']){
                    rt.message=rt.message+' '+award['CardName'];
                }
                if(award['SecondDropCard']){
                    award['SecondDropCard'].forEach(function(card){
                        rt.message=rt.message+' '+card['CardName'];
                    });
                }
                if(clear['IsClear']){
                    rt.message=rt.message+ '<br/>'+
                        '通关奖励：'+ '金币×'+clear['Coins']+' '+
                        clear['CardName'];
                    if(clear['SecondDropCard']){
                        clear['SecondDropCard'].forEach(function(card){
                            rt.message=rt.message+' '+card['CardName'];
                        });
                    }
                }
                if(cardChip){
                    rt.message+=' 获得碎片：';
                    cardChip.forEach(function(chip){
                        rt.message = rt.message+chip['CardName']+'×'+chip['Num'];
                    });
                }
            }
        }
        else {
            rt.status = 0;
            rt.message = br.message;
        }
        return rt;
    }
    else {
        return null;
    }
}
function syncMazeBattleAll(mapStageId) {
    if($('#lblMazeIsClear'+mapStageId).text()=='1'){
        return alert(mapStageId+'塔已经通关！');
    }
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
                    battleResult = decodeBattleResult(battleResult);
                    if(battleResult.status){
                        if(battleResult.win){
                            output.append('<li>战斗胜利：' + battleResult.message + '</li>');
                        }
                        else{
                            output.append('<li>战斗失败：' + battleResult.message + '</li>');
                            $('#consoleLog').scrollTop(output.height());
                            mazeShow(mapStageId);
                            userInfo();
                            return;
                        }
                    }
                    else{
                        output.append('<li>战斗中止：' + battleResult.message + '</li>');
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
                                battleResult = decodeBattleResult(battleResult);
                                if(battleResult.status){
                                    if(battleResult.win){
                                        output.append('<li>战斗胜利：' + battleResult.message + '</li>');
                                    }
                                    else{
                                        output.append('<li>战斗失败：' + battleResult.message + '</li>');
                                        $('#consoleLog').scrollTop(output.height());
                                        mazeShow(mapStageId);
                                        userInfo();
                                        return;
                                    }
                                }
                                else{
                                    output.append('<li>战斗中止：' + battleResult.message + '</li>');
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
    if($('#lblMazeIsClear'+mapStageId).text()=='1'){
        return alert(mapStageId+'塔已经通关！');
    }
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
                    battleResult = decodeBattleResult(battleResult);
                    if(battleResult.status){
                        if(battleResult.win){
                            output.append('<li>战斗胜利：' + battleResult.message + '</li>');
                        }
                        else{
                            output.append('<li>战斗失败：' + battleResult.message + '</li>');
                            $('#consoleLog').scrollTop(output.height());
                            mazeShow(mapStageId);
                            userInfo();
                            return;
                        }
                    }
                    else{
                        output.append('<li>战斗中止：' + battleResult.message + '</li>');
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
                                battleResult = decodeBattleResult(battleResult);
                                if(battleResult.status){
                                    if(battleResult.win){
                                        output.append('<li>战斗胜利：' + battleResult.message + '</li>');
                                    }
                                    else{
                                        output.append('<li>战斗失败：' + battleResult.message + '</li>');
                                        $('#consoleLog').scrollTop(output.height());
                                        mazeShow(mapStageId);
                                        userInfo();
                                        return;
                                    }
                                }
                                else{
                                    output.append('<li>战斗中止：' + battleResult.message + '</li>');
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
                $('#lblMazeIsClear' + mapStageId).text(data.Clear==1?'是':'-');
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
    if ($('#lblMazeFreeReset' + mapStageId).text() == '0') {
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
                //$('#username').text(data['UserName']);
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