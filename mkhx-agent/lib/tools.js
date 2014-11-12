/**
 * Created by 亮 on 2014/11/10.
 */

var http = require('http');
var zlib = require('zlib');

exports.http = {
    /**
     * 发送get请求并解析为返回数据中的data字段
     * @param {object} server http.request要求http header的格式
     * @param {function} callback function(err,result)
     */
    get:function(server, callback){
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
                        if(data.data===undefined){
                            data.data = {};
                        }
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
    },
    /**
     * 发送post请求并解析为返回数据中的data字段
     * @param {object} server http.request要求http header的格式
     * @param {string} reqContent post的数据
     * @param {function} callback function(err,result)
     */
    post:function(server ,reqContent, callback){
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
                        if(data.data===undefined){
                            data.data = {};
                        }
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