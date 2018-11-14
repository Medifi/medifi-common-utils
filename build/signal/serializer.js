'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSerializer = undefined;

var _mapping;

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var serializeSignal = function serializeSignal(user) {
  var dateSent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var date = new Date(dateSent).getTime(); // if null, date today is sent


  if (!user.id || !user.fullName || !user.role) {
    throw new Error('expected user to contain id, fullName and role');
  }

  var data = Object.assign({}, payload, { dateSent: date }, { user: user });

  return JSON.stringify(data);
};

var message = function message(user, dateSent, _message) {
  if (!_message.id || !_message.body) {
    throw new Error('expected message to contain id and body');
  }

  var id = _message.id,
      body = _message.body;

  return serializeSignal(user, dateSent, { id: id, body: body });
};

var typing = function typing(user, dateSent) {
  var isTyping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return (
    // cast anything to boolean
    serializeSignal(user, dateSent, { isTyping: !!isTyping })
  );
};

var endSession = function endSession(user, dateSent) {
  return serializeSignal(user, dateSent, null);
};

// for video

var requestVideoCall = function requestVideoCall(user, dateSent) {
  return serializeSignal(user, dateSent);
};

var cancelVideoCallRequest = function cancelVideoCallRequest(user, dateSent) {
  return serializeSignal(user, dateSent);
};

var acceptVideoInvite = function acceptVideoInvite(user, dateSent) {
  return serializeSignal(user, dateSent);
};

var rejectVideoInvite = function rejectVideoInvite(user, dateSent) {
  return serializeSignal(user, dateSent);
};

var endVideoCall = function endVideoCall(user, dateSent) {
  return serializeSignal(user, dateSent);
};

var connection = function connection(user, dateSent) {
  var ready = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return serializeSignal(user, dateSent, { ready: !!ready });
};

var mapping = (_mapping = {}, _defineProperty(_mapping, types.MESSAGE, message), _defineProperty(_mapping, types.END_SESSION, endSession), _defineProperty(_mapping, types.TYPING_INDICATOR, typing), _defineProperty(_mapping, types.CONNECTION, connection), _defineProperty(_mapping, types.REQUEST_VIDEO_CALL, requestVideoCall), _defineProperty(_mapping, types.REQUEST_VIDEO_CALL_CANCEL, cancelVideoCallRequest), _defineProperty(_mapping, types.ACCEPT_VIDEO_INVITE, acceptVideoInvite), _defineProperty(_mapping, types.REJECT_VIDEO_INVITE, rejectVideoInvite), _defineProperty(_mapping, types.END_VIDEO_CALL, endVideoCall), _mapping);

var getSerializer = exports.getSerializer = function getSerializer(type) {
  return mapping[type];
};

exports.default = {
  serializeSignal: serializeSignal,
  message: message,
  typing: typing,
  endSession: endSession,
  connection: connection,
  requestVideoCall: requestVideoCall,
  cancelVideoCallRequest: cancelVideoCallRequest,
  acceptVideoInvite: acceptVideoInvite,
  rejectVideoInvite: rejectVideoInvite,
  endVideoCall: endVideoCall,
  getSerializer: getSerializer
};