var login = require('./login');
var maze = require('./maze');

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index');
    });
    app.get('/login',function(req, res){
        res.render('index');
    });
    app.post('/login', login);
    app.get('/mazeInfo/:mapStageId',maze.info);
};
