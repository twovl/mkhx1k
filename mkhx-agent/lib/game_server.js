var http = require('http');
var querystring = require('querystring');
var URL = require('url');
var zlib = require('zlib');
var async = require('async');
var commons = require('./commons.js');
var services = require('./game_server_services.js');
var allcards = require('./allcards.js');

/**
 * 登录游戏服务器
 * @param {JSON} passport
 * @param {function} callback function(err,userData),userData包含passport、pptRtnData、host、sid
 */
exports.passportLogin = function (passport, callback) {
    var server = {
        host: URL.parse(passport['GS_IP']).host,
        path: services.passportLogin.path,
        method: services.passportLogin.method,
        headers: commons.headers()
    };
    var reqContent = services.passportLogin.params;
    reqContent['Udid'] = commons.deviceInfo.udid;
    reqContent['time'] = passport['timestamp'];
    reqContent['UserName'] = passport['userName'];
    reqContent['key'] = passport['key'];
    reqContent['Password'] = passport['U_ID'];
    reqContent = querystring.stringify(reqContent);
    server.headers['Content-Length'] = reqContent.length;
    var req = http.request(server, function (res) {
        var data = '';
        var stream = null;
        switch (res.headers['content-encoding']) {
            case 'gzip':
                stream = res.pipe(zlib.createGunzip());
                break;
            case 'deflate':
                stream = res.pipe(zlib.createInflate());
                break;
            default :
                stream = res;
        }
        stream.setEncoding('utf8');
        stream.on('data', function (chunk) {
            data += chunk;
        });
        stream.on('end', function () {
            if (data) {
                data = JSON.parse(data);
                if (data.status) {
                    //登录成功
                    var userData = {
                        status: 1,
                        passport: passport,
                        pptRtnData: data.data,
                        host: server.host,
                        sid: res.headers['set-cookie'][0].split(/\W+/)[1]//获取cookie中的sid
                    };
                    callback(null, userData);
                }
                else {
                    //登录失败
                    callback(data, null);
                }
            }
            else {
                callback({'status': 0, 'message': '游戏服务器无响应'}, null);
            }
        });
    });
    req.write(reqContent);
    req.end();
};

/**
 * 迷宫相关操作
 *
 */
exports.maze = {
    /**
     * 获取迷宫状态信息
     * @param {string} host 游戏服务器地址
     * @param {string} sid 游戏服务器用户_sid
     * @param {number} mapStageId 迷宫所在的地图号
     * @param {function} callback function(err,mazeInfo)
     */
    show: function (host, sid, mapStageId, callback) {
        var server = {
            host: host,
            path: services.maze.show.path,
            method: services.maze.show.method,
            headers: commons.headers()
        };
        var reqContent = services.maze.show.params;
        reqContent['MapStageId'] = mapStageId;
        reqContent = querystring.stringify(reqContent);
        server.headers['Cookie'] = '_sid=' + sid;
        server.headers['Content-Length'] = reqContent.length;

        var req = http.request(server, function (res) {
            var data = '';
            var stream = null;
            switch (res.headers['content-encoding']) {
                case 'gzip':
                    stream = res.pipe(zlib.createGunzip());
                    break;
                case 'deflate':
                    stream = res.pipe(zlib.createInflate());
                    break;
                default :
                    stream = res;
            }
            stream.setEncoding('utf8');
            stream.on('data', function (chunk) {
                data += chunk;
            });
            stream.on('end', function () {
                if (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        //获取成功
                        data.data.status = 1;
                        callback(null, data.data);
                    }
                    else {
                        //获取失败
                        callback(data, null);
                    }
                }
                else {
                    callback({'status': 0, 'message': '游戏服务器无响应'}, null);
                }
            });
        });
        req.write(reqContent);
        req.end();
    },

    /**
     * 获取所有层信息
     * @param {string} host 游戏服务器地址
     * @param {string} sid 游戏服务器用户_sid
     * @param {number} mapStageId 迷宫所在的地图号
     * @param {function} callback function(err,mazeInfos)
     */
    infos: function (host, sid, mapStageId, callback) {
        var layerCount = 0;
        switch (mapStageId) {
            case '2':
                layerCount = 3;
                break;
            case '3':
                layerCount = 3;
                break;
            case '4':
                layerCount = 4;
                break;
            case '5':
                layerCount = 4;
                break;
            case '6':
                layerCount = 5;
                break;
            case '7':
                layerCount = 5;
                break;
            case '8':
                layerCount = 5;
                break;
            default:
                callback({'status': 0, 'message': mapStageId + '图没有迷宫'}, null);
                return;
        }
        //存储所有的层信息
        var funs = {};
        //同步执行，获得所有层信息后，传给客户

        for (var i = 1; i <= layerCount; i++) {
            (function (layerNum) {
                funs['layer' + layerNum] = function (callback) {
                    exports.maze.info(host, sid, mapStageId, layerNum,
                        function (err, mazeInfo) {
                            callback(null, err ? err : mazeInfo);
                        });
                }
            })(i);
        }
        async.series(funs, callback);
    },

    /**
     * 获取某层信息
     * @param {string} host 游戏服务器地址
     * @param {string} sid 游戏服务器用户_sid
     * @param {number} mapStageId 迷宫所在的地图号
     * @param {number} layer 层号
     * @param {function} callback function(err,mazeInfo)
     */
    info: function (host, sid, mapStageId, layer, callback) {
        var server = {
            host: host,
            path: services.maze.info.path,
            method: services.maze.info.method,
            headers: commons.headers()
        };
        var reqContent = services.maze.info.params;
        reqContent['MapStageId'] = mapStageId;
        reqContent['Layer'] = layer;
        reqContent = querystring.stringify(reqContent);
        server.headers['Cookie'] = '_sid=' + sid;
        server.headers['Content-Length'] = reqContent.length;

        var req = http.request(server, function (res) {
            var data = '';
            var stream = null;
            switch (res.headers['content-encoding']) {
                case 'gzip':
                    stream = res.pipe(zlib.createGunzip());
                    break;
                case 'deflate':
                    stream = res.pipe(zlib.createInflate());
                    break;
                default :
                    stream = res;
            }
            stream.setEncoding('utf8');
            stream.on('data', function (chunk) {
                data += chunk;
            });
            stream.on('end', function () {
                if (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        //获取成功
                        data.data.status = 1;
                        callback(null, data.data);
                    }
                    else {
                        //获取失败
                        callback(data, null);
                    }
                }
                else {
                    callback({'status': 0, 'message': '游戏服务器无响应'}, null);
                }
            });
        });
        req.write(reqContent);
        req.end();
    },

    /**
     * 与迷宫一层中的某个index上的怪战斗
     * @param {string} host  游戏服务器地址
     * @param {string} sid 游戏服务器用户_sid
     * @param {number} mapStageId 迷宫所在的地图号
     * @param {number} layer 层号
     * @param {number} itemIndex 怪的index
     * @param {boolean} manual 是否手动，0否，1是
     * @param {function} callback function(err,battleResult)
     */
    battle: function (host, sid, mapStageId, layer, itemIndex, manual, callback) {
        var server = {
            host: host,
            path: services.maze.battle.path,
            method: services.maze.battle.method,
            headers: commons.headers()
        };
        var reqContent = services.maze.battle.params;
        reqContent['MapStageId'] = mapStageId;
        reqContent['Layer'] = layer;
        reqContent['manual'] = manual;
        reqContent['ItemIndex'] = itemIndex;
        reqContent = querystring.stringify(reqContent);
        server.headers['Cookie'] = '_sid=' + sid;
        server.headers['Content-Length'] = reqContent.length;

        var req = http.request(server, function (res) {
            var data = '';
            var stream = null;
            switch (res.headers['content-encoding']) {
                case 'gzip':
                    stream = res.pipe(zlib.createGunzip());
                    break;
                case 'deflate':
                    stream = res.pipe(zlib.createInflate());
                    break;
                default :
                    stream = res;
            }
            stream.setEncoding('utf8');
            stream.on('data', function (chunk) {
                data += chunk;
            });
            stream.on('end', function () {
                if (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        //获取成功
                        var result = data.data;
                        result.status = 1;
                        if (manual) {
                            //判断是否自动战斗
                            delete result["BattleId"];
                            delete result["prepare"];
                            delete result["AttackPlayer"];
                            delete result["DefendPlayer"];
                            delete result["Battle"];
                            if (result['Win'] == 1) {
                                //是否胜利
                                var cardId = result['ExtData']['Award']['CardId'];
                                var secondDrop = result['ExtData']['Award']['SecondDropCard'];
                                var secondId = 0;
                                //翻译战斗获得卡牌
                                result['ExtData']['Award']['CardName'] = allcards[cardId]['CardName'];
                                if (secondDrop) {
                                    //是否获得其它掉落
                                    for (i = 0; i < secondDrop.length; i++) {
                                        secondId = secondDrop[i]['CardId'];
                                        secondDrop[i]['CardName'] = allcards[secondId]['CardName'];
                                    }
                                }
                                //TODO 是否获得碎片 data['ExData']["CardChip"] = [{"ChipId":"503","Num":1}]

                                //翻译通关获得卡牌
                                cardId = result['ExtData']['Clear']['CardId'];
                                secondDrop = result['ExtData']['Clear']['SecondDropCard'];
                                result['ExtData']['Clear']['CardName'] = allcards[cardId]['CardName'];
                                if (secondDrop) {
                                    //是否获得其它掉落
                                    secondId = 0;
                                    for (var i = 0; i < secondDrop.length; i++) {
                                        secondId = secondDrop[i]['CardId'];
                                        secondDrop[i]['CardName'] = allcards[secondId]['CardName'];
                                    }
                                }
                            }
                        }
                        else {
                            //TODO 非自动战斗回复
                        }
                        callback(null, result);
                    }
                    else {
                        //获取失败
                        callback(data, null);
                    }
                }
                else {
                    callback({'status': 0, 'message': '游戏服务器无响应'}, null);
                }
            });
        });
        req.write(reqContent);
        req.end();
    },

    /**
     * 重置迷宫
     * @param {string} host
     * @param {string} sid
     * @param {number} mapStageId
     * @param {function} callback
     */
    reset: function (host, sid, mapStageId, callback) {
        var server = {
            host: host,
            path: services.maze.reset.path,
            method: services.maze.reset.method,
            headers: commons.headers()
        };
        var reqContent = services.maze.reset.params;
        reqContent['MapStageId'] = mapStageId;
        reqContent = querystring.stringify(reqContent);
        server.headers['Cookie'] = '_sid=' + sid;
        server.headers['Content-Length'] = reqContent.length;

        var req = http.request(server, function (res) {
            var data = '';
            var stream = null;
            switch (res.headers['content-encoding']) {
                case 'gzip':
                    stream = res.pipe(zlib.createGunzip());
                    break;
                case 'deflate':
                    stream = res.pipe(zlib.createInflate());
                    break;
                default :
                    stream = res;
            }
            stream.setEncoding('utf8');
            stream.on('data', function (chunk) {
                data += chunk;
            });
            stream.on('end', function () {
                if (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        //成功
                        callback(null, {'status': 1, 'message': '重置成功'});
                    }
                    else {
                        //失败
                        callback(data, null);
                    }
                }
                else {
                    callback({'status': 0, 'message': '游戏服务器无响应'}, null);
                }
            });
        });
        req.write(reqContent);
        req.end();
    }
};

/**
 * 用户相关操作
 */
exports.user = {
    info:function(host, sid, hallOpen, callback){
        var server = {
            host: host,
            path: services.user.getUserInfo.path,
            method: services.user.getUserInfo.method,
            headers: commons.headers()
        };
        var reqContent = services.user.getUserInfo.params;
        reqContent['hallOpen'] = hallOpen;
        reqContent = querystring.stringify(reqContent);
        server.headers['Cookie'] = '_sid=' + sid;
        server.headers['Content-Length'] = reqContent.length;

        var req = http.request(server, function (res) {
            var data = '';
            var stream = null;
            switch (res.headers['content-encoding']) {
                case 'gzip':
                    stream = res.pipe(zlib.createGunzip());
                    break;
                case 'deflate':
                    stream = res.pipe(zlib.createInflate());
                    break;
                default :
                    stream = res;
            }
            stream.setEncoding('utf8');
            stream.on('data', function (chunk) {
                data += chunk;
            });
            stream.on('end', function () {
                if (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        //成功
                        data.data.status = 1;
                        callback(null, data.data);
                    }
                    else {
                        //失败
                        callback(data, null);
                    }
                }
                else {
                    callback({'status': 0, 'message': '游戏服务器无响应'}, null);
                }
            });
        });
        req.write(reqContent);
        req.end();
    }
};

exports.legion = {
    /**
     *
     * @param host
     * @param sid
     * @param callback
     */
    current:function(host, sid, callback){
        var server = {
            host: host,
            path: services.legion.getUserLegion.path,
            method: services.legion.getUserLegion.method,
            headers: commons.headers()
        };
        server.headers['Cookie'] = '_sid=' + sid;

        var req = http.request(server, function (res) {
            var data = '';
            var stream = null;
            switch (res.headers['content-encoding']) {
                case 'gzip':
                    stream = res.pipe(zlib.createGunzip());
                    break;
                case 'deflate':
                    stream = res.pipe(zlib.createInflate());
                    break;
                default :
                    stream = res;
            }
            stream.setEncoding('utf8');
            stream.on('data', function (chunk) {
                data += chunk;
            });
            stream.on('end', function () {
                if (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        //成功
                        data.data.status = 1;
                        callback(null, data.data);
                    }
                    else {
                        //失败
                        callback(data, null);
                    }
                }
                else {
                    callback({'status': 0, 'message': '游戏服务器无响应'}, null);
                }
            });
        });
        req.end();
    }
};