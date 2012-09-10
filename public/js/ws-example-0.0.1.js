var webSocketHandler;

var createWebSocketHandler = function(callback) {
  var addMessage = function(message, event) {
    var text = $('#messages').val();
    text += '\n' + message + '\n';
    text += JSON.stringify(event, null, '  ');
    $('#messages').val(text);
  };

  var webSocket;
  try {
    webSocket = new WebSocket('ws://' + document.location.host + '/message');
  } catch(err) {
    addMessage('WebSocket Creation Failed', err);
    return undefined;
  }

  webSocket.onopen = function(event) {
    addMessage('WebSocket Connected', event);
    callback();
  };

  webSocket.onclose = function(event) {
    addMessage('WebSocket Closed', event);
  };

  webSocket.onerror = function(event) {
    addMessage('WebSocket Error', event);
  };

  webSocket.onmessage = function(event) {
    addMessage('Incoming WebSocket Message', event);
  };

  var sendMessage = function(message) {
    webSocket.send(message);
  };

  return {
    sendMessage: sendMessage
  };
};

$('#messages').width($(document).width() * 0.9);
$('#messages').height($(document).height() * 0.75);
$('#message').width($(document).width() * 0.5);

$('#actions').hide();

$('#connect').click(function() {
  webSocketHandler = createWebSocketHandler(function() {
    $('#actions').show();
  });
  $('#startup').hide();
});

$('#sendMessage').click(function() {
  var message = $('#message').val();
  if (message.length > 1) {
    webSocketHandler.sendMessage(message);
  }
});
