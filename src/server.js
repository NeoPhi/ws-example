// Basic connect app to server up the static files
// https://github.com/senchalabs/connect
var connect = require('connect');
var app = connect().use(connect['static']('public'));

// Basic HTTP server listening on port 8000
// http://nodejs.org/docs/latest/api/all.html#all_http_createserver_requestlistener
var http = require('http');
var server = http.createServer(app);
server.listen(8000);

// WebSocket Server using the same server as above on a sub-path
// https://github.com/einaros/ws
var WebSocketServer = require('ws').Server;
var webSocketServer = new WebSocketServer({
  server: server,
  path: '/message'
});

var sendError = function(err) {
  if (err) {
    console.error('Send Error', err);
  }
};

var messageCount = 0;
webSocketServer.on('connection', function(webSocket) {
  console.log('New WebSocket Connection');
  webSocket.on('message', function(message) {
    console.log('Incoming WebSocket Message', message);
    webSocket.send('Right Back At You! ' + messageCount, sendError);
    messageCount += 1;
  });
  webSocket.send('Why Hello There!', sendError);
});

console.log('Server Ready');
