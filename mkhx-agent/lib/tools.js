/**
 * Created by 亮 on 2014/11/10.
 */

var http = require('http');
var zlib = require('zlib');
var querystring = require('querystring');

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
    },

    /**
     * 发送加密后的post请求并解析为返回数据中的data字段
     * @param {object} server http.request要求http header的格式
     * @param {string} reqContent post的数据
     * @param {function} callback function(err,result)
     */
    postEncrypted:function(server ,reqContent, callback){

        //1. 将serve中path的参数（即?之后）去掉
        var s = server.path.split("?");
        server.path = s[0];

        //2. 将reqContent a=a1&b=b1&c=c1类型的参数转为json对象（querystring.parse）params，如果为空，则新建一个json对象
        var params;
        if(reqContent==null || reqContent.length==0){
            params  = {};
        }
        else{
            params = querystring.parse(reqContent);
        }

        //3. params中添加mzsg属性，值为去掉的参数
        params["mzsg"] = s[1];
        //4. params中添加"pvpNewVersion":"1","OpenCardChip":"1"
        params["pvpNewVersion"] = "1";
        params["OpenCardChip"] = "1";

        //5. params序列化为字符串（JSON.stringify）
        params = JSON.stringify(params);

        //6. zlib压缩params，并转换为base64 string
        //var buff = new Buffer(params);
       // params = zlib.gzipSync(buff).toString("base64");
        params = zlib.deflateSync(params).toString("base64");

        //7. 随机生成长度为5，字符为a-z1-9的字符串s1
        var s1 = randomString(5);

        //8. 随机生成长度为1-9随机数，字符为a-z1-9的字符串s2
        var s2 = randomString(Math.ceil(Math.random()*9));
        //9. sz=s1+s2.length+s2+params
        var sz = s1 + s2.length + s2 + params;

        //10. sb=md5String(sz+'1234567890')
        var sb = md5(sz+"1234567890");
        //11. params构造为z=sz&b=sb的querystring
        params = querystring.stringify({"z":sz,"b":sb});

        //12. 最终调用普通的post发送
        exports.http.post(server, params, callback);
    }
};
exports.md5 = md5;

function md5 (text) {
    return require("crypto").createHash('md5').update(text).digest('hex');
}

function randomString (length) {
    var s = "";
    var dict = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n"
        ,"o","p","q","r","s","t","u","v","w","x","y","z"
        ,"1","2","3","4","5","6","7","8","9"];
    for(var i=0;i<length;i++){
        s += dict[Math.floor(Math.random()*dict.length)];
    }
    return s;
}
