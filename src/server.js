// Simulate Apache running on port 8000 serving static content
var connect = require('connect');
connect.createServer(connect['static']('./public/')).listen(8000);
console.log('Hit http://localhost:8000/ in browser to start');

// WebSocket Server
var WebSocketServer = require('ws').Server;
var webSocketServer = new WebSocketServer({
  port: 8080
});
var sendError = function(err) {
  if (err) {
    console.error('Send Error', err);
  }
};

webSocketServer.on('connection', function(webSocket) {
  console.log('New WebSocket Connection');
  webSocket.on('message', function(message) {
    console.log('Incoming WebSocket Message', message);
    webSocket.send('Right Back At You!', sendError);
  });
  webSocket.send('Why Hello There!', sendError);
});
