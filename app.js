/**
 * Module dependencies.
 */
var express = require('express');
var favicon = require('serve-favicon');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');

var http = require('http');
var path = require('path');

var routes = require('./routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(morgan());
app.use(bodyParser());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cookieParser('mkhx1k 185'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}
routes(app);
http.createServer(app).listen(app.get('port'),  function(){
    console.log('Express server listening on port ' + app.get('port'));
});
