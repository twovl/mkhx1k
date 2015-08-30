//登录游戏服务器
exports.passportLogin = {
    path: '/login.php?do=PassportLogin&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
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
        path: '/maze.php?do=Show&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
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
        path: '/maze.php?do=Info&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
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
        path: '/maze.php?do=Battle&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
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
        path: '/maze.php?do=Reset&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
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
    },
    //神秘塔
    showMysticMaze:{
        path: '/maze.php?do=ShowMysticMaze&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'GET'
        /*
        {
            "status": 1,
            "data": {
                "subMazeInfo": {
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 0,
                    "6": 0,
                    "7": 0,
                    "8": 1
                },
                "expire": 0,
                "restTime": 4,
                "cash": 100,
                "addTime": 1800,
                "layer": 1
            },
            "version": {
                "http": "201302484",
                "stop": "",
                "appversion": "version_1",
                "appurl": "ios:\/\/xxx",
                "encrypt": 0
            }
        }
        */
    }
};
exports.card = {
    getAllCard: {
        path: '/card.php?do=GetAllCard&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'GET'
    }
};

exports.user = {
    getUserInfo: {
        path: '/user.php?do=GetUserinfo&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'POST',
        params: {
            'hallOpen': true
        }
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
     "UserName": "0000",
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
};

exports.legion = {
    getUserLegion : {
        path: '/legion.php?do=GetUserLegion&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'GET'
    }
    /*
    {
        "status": 1,
        "data": {
            "LegionId": "2",
            "LegionName": "\u6211\u548c\u6211\u7684\u5c0f\u4f19\u4f34",
            "StrengExpAdd": 20,
            "Duty": 3
        },
        "version": {
            "http": "201302445",
            "stop": "",
            "appversion": "version_1",
            "appurl": "ios:\/\/xxx",
            "encrypt": 0
        }
    }
    */
};

exports.mapstage = {
    getUserMapStages : {
        path: '/mapstage.php?do=GetUserMapStages&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'GET'
        /*
         "data": {
         "1": {
         "Uid": "45122",
         "MapStageDetailId": "1",
         "Type": "1",
         "MapStageId": "1",
         "FinishedStage": "3",
         "LastFinishedTime": "2013-08-18 17:45:20",
         "CounterAttackTime": "0"
         },
         "2": {
         "Uid": "45122",
         "MapStageDetailId": "2",
         "Type": "1",
         "MapStageId": "1",
         "FinishedStage": "3",
         "LastFinishedTime": "2013-08-18 17:47:31",
         "CounterAttackTime": "0"
         },
         。。。。CounterAttackTime不为0，则表示该关卡被入侵
         */
    },
    //打地图入侵怪
    editUserMapStages : {
        path: '/mapstage.php?do=EditUserMapStages&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'POST',
        params:{
            'MapStageDetailId':1,
            'isManual':0
        }
        /*
         "data": {
         "BattleId": "131902ade0a9c6b97cbee5528c1329955460670690f34",
         "Win": 1,
         "ExtData": {
         "StarUp": 0,
         "Bonus": ["Exp_1550", "Coins_1760"],
         "UserLevel": "90",
         "Exp": 97648120,
         "PrevExp": "96640700",
         "NextExp": "102699000"
         },
         "prepare": null,
         "AttackPlayer":{},
         。。。。。。
         */
    },
    //探索
    explore : {
        path: '/mapstage.php?do=Explore&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'POST',
        params: {
            'MapStageDetailId': 1
        }
        /*
         "data": {
             "Bonus": ["Exp_2270", "Coins_2590"],
             "UserLevel": "90",
             "Exp": 97653710,
             "PrevExp": "96640700",
             "NextExp": "102699000",
             //如果有这个，代表有贼出现
             "ThievesInfo": {
                 "Uid": 34759,
                 "NickName": "\u5c0f\u4f19\u4f34\u00d6\u6b66\u5219\u5929",
                 "Avatar": 213,
                 "Sex": "1",
                 "ThievesId": 15,
                 "Time": 1415604526,
                 "Status": 0,
                 "Attackers": [],
                 "Awards": [],
                 "HPCount": 4340,
                 "HPCurrent": 4340,
                 "Type": 1,
                 "UserThievesId": 3136391,
                 "Round": 0,
                 "FleeTime": 7200
             },
             "Countdown": -1415604526
         }
         */
    }
};

exports.dungeon = {
    getUserDungeon:{
        path: '/dungeon.php?do=GetUserDungeon&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'GET'
        /*
         "data": {
         "UserDungeon": {
         "Uid": "51805",
         "CurrentLayer": "0",
         "MaxFinishLayer": "62",
         "Resurrection": "2",
         "BuyTimes": "0",
         "Anger": "0",
         "Status": "0",
         "FinishedBoss": "",
         "RaidsStatus": "0",//0为没有扫荡过，1为已经扫荡
         "RaidsLayer": 40//扫荡到的层数
         },
         "DungeonConditions": [{
         "ConditionId": "30",
         "Type": "103",
         "Value": "3",
         "Content": "卡组中蛮荒种族卡牌不小于3张",
         "Marks": "1,2,3,4,5,6,9,10",
         "Layer": 5
         },
         。。。每层要求条件],
         "RCash": 10,
         "BuffId": 0,
         "Content": null
         }
         */
    },
    sweep:{
        path: '/dungeon.php?do=Sweep&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'GET'
        /*
         "data": {
             "Award": {
                 "Coins": 32610,
                 "Exp": 26130,
                 "Anger": 396,
                 "Cards": [{
                     "CardId": 220,
                     "Num": 1
                     },
                     {
                     "CardId": 21,
                     "Num": 2
                     },
                     {
                     "CardId": 193,
                     "Num": 1
                     }],
                 "Chips": [{
                     "ChipId": 244,
                     "Num": 2
                     },
                     {
                     "ChipId": 56,
                     "Num": 2
                     },
                     {
                     "ChipId": 113,
                     "Num": 2
                     },
                     {
                     "ChipId": 55,
                     "Num": 2
                     },
                     {
                     "ChipId": 90,
                     "Num": 4
                     },
                     {
                     "ChipId": 169,
                     "Num": 2
                     },
                     {
                     "ChipId": 178,
                     "Num": 2
                 }]
             },
             "UserLevelInfo": {
                 "Level": 75,
                 "Exp": 37828300,
                 "PrevExp": 35301200,
                 "NextExp": 40204700
             }
         }
         */
    },
    fight: {
        path: '/dungeon.php?do=Fight&v=6614&OpenCardChip=1&v=1688&phpp=WP8&phpl=ZH_CN&pvc=1.7.1&pvb=2015-08-06+18%3a35%',
        method: 'POST',
        params:{
            'Layer':42,
            'isManual':0
        }
        /*
         "data": {
             "BattleId": "9abdbdb3a3bd6a39a9170ecefb01e56953e60f16004ee",
             "Win": 1,
             "ExtData": {
                 "Award": {
                     "Coins": 1530,
                     "Exp": 1220,
                     "Anger": 18
                 },
                 "AwardChips": [{
                     "ChipId": 244,
                     "Num": 2
                  }],
                 "User": {
                     "Level": 75,
                     "Exp": 37830740,
                     "PrevExp": 35301200,
                     "NextExp": 40204700
                 }
             },
             "Battle":{},
             "AwardCards": [],
             "prepare": null,
             "AttackPlayer": {},
             "DefendPlayer": {}
         }
         */
    }
};
