/**
 * Created by 亮 on 2014/4/29.
 */

module.exports={
    passportLogin:{
        path:'/login.php?do=PassportLogin&v=6614&OpenCardChip=1&phpp=WP8&phpl=ZH_CN&pvc=1.4.6&pvb=2014-04-24+12%3a05%3a00',
        method:'POST',
        params:{
            Udid:'',//设备ID
            time:'',//登录主服务器返回的时间戳
            UserName: '',//登录用户名
            Origin:'WP8',
            key:'',//登录服务器返回的key
            Password:'',//登录主服务器返回的U_ID
            Devicetoken:''//空
        }
    },
    getUserInfo:{
        path:'/user.php?do=GetUserinfo&OpenCardChip=1&v=6615&OpenCardChip=1&phpp=WP8&phpl=ZH_CN&pvc=1.4.6&pvb=2014-04-24+12%3a05%3a00',
        method:'GET'
    },
    getMazeInfo:{
        path:'/maze.php?do=Show&v=6614&OpenCardChip=1&phpp=WP8&phpl=ZH_CN&pvc=1.4.6&pvb=2014-04-24+12%3a05%3a00',
        method:'POST',
        params:{
            MapStageId:'7'//迷宫号，2-8塔
        }
    }
};
