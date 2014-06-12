var mkhxServer = require('../mkhx-agent');

module.exports = function (req,res){
    var username = req.body['username'];
    var password = req.body['password'];
    mkhxServer.login(username, password, function (err, passport){
        if(err){
            res.render('index',{info: JSON.stringify(err)});
        }
        else{
            mkhxServer.passportLogin(passport, function (err, userData){
                if (err) {
                    res.render('index',{info: JSON.stringify(err)});
                }
                else {
                    res.cookie('remoteInfo', {
                        'sid':userData.sid, 
                        'host':userData.host
                        }, {maxAge: 3600000, httpOnly: true});
                    res.redirect('main');
                };
            });
        }
    });
};