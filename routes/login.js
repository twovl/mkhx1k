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
                    req.session.userData = userData;
                    res.render('main', {info: JSON.stringify(userData)});
                };
            });
        }
    });
};