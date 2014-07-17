//登录游戏服务器
exports.passportLogin = {
    path: '/login.php?do=PassportLogin&v=6614&OpenCardChip=1&phpp=WP8' +
        '&phpl=ZH_CN&pvc=1.5.0&pvb=2014-06-19+14%3a08%3a00',
    method: 'POST',
    params: {
        'Udid': '',//设备ID
        'time': '',//登录主服务器返回的时间戳
        'UserName': '',//登录用户名
        'Origin': 'WP8',
        'key': '',//登录服务器返回的key
        'Password': '',//登录主服务器返回的U_ID
        'Devicetoken': ''//空
    }
    /*
     返回数据结构
     {
     "status": 1,
     "data": {
     "isSetNick": "0",
     "invite": true,
     "gscode": false,
     "minor": false,
     "PlayingTipsUrl": "",
     "cdnurl": "http://d.muhecdn.com/mkhx/",
     "encrypt": 0,
     "ip": "s1.wp.mysticalcard.com",
     "ipport": 8000
     }
     }
     */
};
exports.maze = {
    //获取迷宫信息
    show: {
        path: '/maze.php?do=Show&v=6614&OpenCardChip=1&phpp=WP8' +
            '&phpl=ZH_CN&pvc=1.5.0&pvb=2014-06-19+14%3a08%3a00',
        method: 'POST',
        params: {
            'MapStageId': 7//迷宫号，2-8塔
        }
        /*
         返回数据结构
         {
         "status": 1,
         "data": {
         "Name": "\u672b\u65e5\u4e4b\u5854",//末日之塔
         "Layer": 1,
         "Clear": 0,
         "FreeReset": 1,
         "ResetCash": 100
         },
         "version": {
         "http": "201302418",
         "stop": "",
         "appversion": "version_1",
         "appurl": "ios://xxx",
         "encrypt": 0
         }
         }
         */
    },
    //获取迷宫某层信息
    info: {
        path: '/maze.php?do=Info&v=6614&OpenCardChip=1&phpp=WP8' +
            '&phpl=ZH_CN&pvc=1.5.0&pvb=2014-06-19+14%3a08%3a00',
        method: 'POST',
        params: {
            'MapStageId': 3,//迷宫号，2-8塔
            'Layer': 1//层号
        }
        /*
         返回数据结构
         {
         "status": 1,
         "data": {
         "Name": "\u98d3\u98ce\u4e4b\u5854\u7b2c1\u5c42",//飓风之塔第1层
         "BoxNum": 2,
         "MonsterNum": 1,
         "RemainBoxNum": 1,
         "RemainMonsterNum": 1,
         "Layer": 1,
         "TotalLayer": 3,
         "Map": {//迷宫为1维数组存储的8*4矩阵
         "IsFinish": false,
         "WallRows": [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0],
         "WallCols": [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
         "Items": [1, 1, 1, 1, 1, 1, 1, 4,
         1, 1, 1, 1, 1, 1, 1, 1,
         1, 1, 1, 1, 1, 1, 1, 6,
         5, 1, 2, 1, 3, 1, 1, 1]
         //1为空白格，2为宝箱，3为怪物，4为入口，5为楼梯，6为清理怪物/宝箱后的空白格
         //判断5是否需要战斗，依据IsFinish的值

         }
         },
         "version": {
         "http": "201302422",
         "stop": "",
         "appversion": "version_1",
         "appurl": "ios:\/\/xxx",
         "encrypt": 0
         }
         }
         */
    },
    //战斗返回结果charset为空，其他为utf8
    battle: {
        path: '/maze.php?do=Battle&v=6614&OpenCardChip=1&phpp=WP8' +
            '&phpl=ZH_CN&pvc=1.5.0&pvb=2014-06-19+14%3a08%3a00',
        method: 'POST',
        params: {
            'MapStageId': 3,//迷宫号，2-8塔
            'manual': 0,//是否手动
            'Layer': 1,//层号
            'ItemIndex': 23//对应getMazeLayerInfo返回结果中data.Map.Items[]中值为2、3、5的索引
        }
        /*
         自动战斗的返回数据
         {
         "status": 1,
         "data": {
         "BattleId": "1c48682df61e0274c644f24c803652475385f37c30a23",
         "Win": 1,//失败是2
         "ExtData": {
         "Award": {
         "Coins": 640,
         "Exp": 400,
         "CardId": 94,
         "SecondDropCard": [{
         "CardId": "7002"
         }]
         },
         "Clear": {
         "IsClear": 0,
         "CardId": 0,
         "Coins": 0,
         "SecondDropCard": [{
         "CardId": "7002"
         }]
         },
         "User": {
         "Level": 36,
         "Exp": 1626620,
         "PrevExp": 1441400,
         "NextExp": 1821000
         }
         },
         "prepare": null,
         "AttackPlayer": {
         "Uid": "41390",
         "NickName": "\u5c0f\u79cb\u79cb",
         "Avatar": 0,
         "Sex": 0,
         "Level": 36,
         "HP": "4500",
         "Cards": [{
         "UUID": "atk_1",
         "CardId": "193",
         "UserCardId": 22655760,
         "Attack": 415,
         "HP": 1020,
         "Wait": "4",
         "Level": 10,
         "SkillNew": null,
         "Evolution": null,
         "WashTime": null
         }],
         …………//该场战斗卡牌唯一编号等信息
         "Runes": [{
         "UUID": "atkrune_12",
         "RuneId": "36",
         "UserRuneId": "474133",
         "Level": "0"
         }],
         "RemainHP": 4391
         },
         "DefendPlayer": {
         "Uid": 0,
         "NickName": "\u5b9d\u7bb1\u63a0\u593a\u8005",
         "Avatar": 3,
         "Sex": 1,
         "Level": 4,
         "HP": "1210",
         "Cards": [{
         "UUID": "def_1",
         "CardId": 91,
         "UserCardId": 0,
         "Attack": 99,
         "HP": 276,
         "Wait": "2",
         "Level": 1,
         "SkillNew": null,
         "Evolution": null,
         "WashTime": null
         },
         …………
         "RemainHP": 0
         },
         "Battle": [{
         "Round": 1,
         "isAttack": true,
         "Opps": [{
         "UUID": "",
         "Opp": 1021,
         "Target": null,
         "Value": -1
         },
         {
         "UUID": "atk_6",
         "Opp": 1001,
         "Target": null,
         "Value": 0
         },
         {
         "UUID": "",
         "Opp": 1060,
         "Target": [],
         "Value": 3
         },
         {
         "UUID": "",
         "Opp": 1060,
         "Target": [],
         "Value": 3
         }]
         },
         …………//每回合战斗信息
         }]
         },
         "version": {
         "http": "201302422",
         "stop": "",
         "appversion": "version_1",
         "appurl": "ios:\/\/xxx",
         "encrypt": 0
         }
         }
         */
    },
    //重置迷宫
    reset: {
        path: '/maze.php?do=Reset&v=6614&OpenCardChip=1&phpp=WP8&phpl=ZH_CN&pvc=1.5.0&pvb=2014-06-19+14%3a08%3a00',
        method: 'POST',
        params: {
            'MapStageId': 2
        }
        /*
         {
         "status": 1,
         "version": {
         "http": "201302434",
         "stop": "",
         "appversion": "version_1",
         "appurl": "ios:\/\/xxx",
         "encrypt": 0
         }
         }*/
    }
};
exports.card = {
    getAllCard: {
        path: '/card.php?do=GetAllCard&v=6614&OpenCardChip=1&phpp=WP8&phpl=ZH_CN&pvc=1.5.0&pvb=2014-06-19+14%3a08%3a00',
        method: 'GET'
    }
};

exports.user = {
    getUserInfo: {
        path: '/user.php?do=GetUserinfo&v=6614&OpenCardChip=1&phpp=WP8&phpl=ZH_CN&pvc=1.5.0&pvb=2014-06-19+14%3a08%3a00',
        method: 'POST'
    },
    params: {
        'hallOpen': true
    }
    /*
     {
     "status": 1,
     "data": {
     "Uid": "45122",
     "PwdLockMessage": "",
     "Sex": "0",
     "NickName": "\u5c0f\u4f19\u4f34\u2605L",
     "Avatar": "186",
     "Win": "1017",
     "Lose": 992,
     "Level": "83",
     "Exp": 65855360,
     "Coins": 5108049,
     "Cash": 2042,
     "Ticket": "3",
     "FreshStep": {
     "1": "21",
     "2": "17",
     "4": "13",
     "3": "17",
     "7": "7",
     "8": "3",
     "9": "9",
     "5": "16",
     "6": "5"
     },
     "Energy": 15,
     "EnergyLastTime": 1402910233,
     "EnergyBuyTime": "1402826550",
     "EnergyBuyCount": 0,
     "EnergyMax": 50,
     "LeaderShip": "163",
     "FriendApplyNum": "0",
     "FriendNumMax": "52",
     "DefaultGroupId": 27596,
     "RankWin": "0",
     "RankLost": "0",
     "RankTimes": 12,
     "ThievesTimes": "102",
     "Fragment_5": "2",
     "Fragment_4": "21",
     "Fragment_3": "11",
     "InviteCode": "44tmg4",
     "InviteNum": "22",
     "Udid": "1111111111111111111",
     "LostPoint": "12",
     "Origin": "WP8",
     "Platform": "WP8",
     "Language": "ZH_CN",
     "Birthday": "0000-00-00",
     "Idfa": "11111111111111",
     "OnCard": "2014-07-06",
     "BuyCount": "0",
     "UserName": "wangliang0",
     "NewFreshStep": [],
     "HP": "13300",
     "PrevExp": "62743300",
     "NextExp": "66785700",
     "MonthCardDay": 20,
     "NewEmail": 0,
     "NewGoods": 0,
     "SalaryCount": 0,
     "LoginContinueTimesXX": 16,
     "Boss": 0,
     "isMinor": -1,
     "invite": true,
     "gscode": false,
     "appdriver": false,
     "melee": false,
     "legionfight": false,
     "bindid": false,
     "evolution_on": null,
     "minor": false,
     "DevoteActStatus": {
     "maze": false
     },
     "JourneyActStatus": {
     "isOpen": false,
     "countDown": -1
     },
     "openMysticalMaze": 1,
     "actStatus": {
     "hall": false,
     "autoClearMaze": true
     },
     "LevelToMonster": 30,
     "evolution_wash_times": 10
     },
     "version": {
     "http": "201302432",
     "stop": "",
     "appversion": "version_1",
     "appurl": "ios:\/\/xxx",
     "encrypt": 0
     }
     }
     */
}