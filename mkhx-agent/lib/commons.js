/**
 * Created by 亮 on 2014/4/29.
 */
exports.headers = function () {
    return {
        'UA-CPU': 'ARM',
        'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',
        'Content-Length': 0,
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Language': 'zh-CN',
        'Accept-Encoding': 'gzip, deflate',
        'Proxy-Connection': 'Keep-Alive'
    };
};
exports.deviceInfo = function () {
    return {
        userPassword:"",
        userName: "",
        udid : "db2ca54b9751ac56e800c41e8a4ed91e",
        gameName:"CARD-WP8-CHS",
        clientType: "wp8",
        releaseChannel: "wp8",
        locale: "ZH_CN"
    };
};