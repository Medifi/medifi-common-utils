'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSignal;
function parseSignal(dataString) {
  var data = void 0;

  try {
    data = JSON.parse(dataString);
  } catch (error) {
    throw new Error('invalid data string');
  }

  if (!data.user) {
    throw new Error('parsed signal has no user');
  }

  if (!data.user.id || !data.user.fullName || !data.user.role) {
    throw new Error('parsed signal has invalid user object, expected id, fullName and role');
  }

  if (!data.dateSent) {
    data.dateSent = new Date();
  } else {
    data.dateSent = new Date(data.dateSent);
  }

  return data;
}