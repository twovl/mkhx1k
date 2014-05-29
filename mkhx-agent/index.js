var mainServer = require('./lib/main_server');
var gameServer = require('./lib/game_server');

exports = module.exports = gameServer;

exports.login = mainServer.login;