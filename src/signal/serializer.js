import * as types from './types'

const serializeSignal = (user, dateSent = null, payload = null) => {
  const date = new Date(dateSent).getTime() // if null, date today is sent


  if (!user.id || !user.fullName || !user.role) {
    throw new Error('expected user to contain id, fullName and role')
  }

  const data = Object.assign({}, payload, { dateSent: date }, { user })

  return JSON.stringify(data)
}

const message = (user, dateSent, message) => {
  if (!message.id || !message.body) {
    throw new Error('expected message to contain id and body')
  }

  const { id, body } = message
  return serializeSignal(user, dateSent, { id, body })
}

const sendMedicalDocument = (user, dateSent, type) => {
  if (!type) throw new Error('expected to medical document type')

  return serializeSignal(user, dateSent, { type })
}

const typing = (user, dateSent, isTyping = true) =>
  // cast anything to boolean
  serializeSignal(user, dateSent, { isTyping: !!isTyping })

const endSession = (user, dateSent) =>
  serializeSignal(user, dateSent, null)

// for video

const requestVideoCall = (user, dateSent) =>
  serializeSignal(user, dateSent)

const cancelVideoCallRequest = (user, dateSent) =>
  serializeSignal(user, dateSent)

const acceptVideoInvite = (user, dateSent) =>
  serializeSignal(user, dateSent)

const rejectVideoInvite = (user, dateSent) =>
  serializeSignal(user, dateSent)

const endVideoCall = (user, dateSent) =>
  serializeSignal(user, dateSent)

const connection = (user, dateSent, ready = true) =>
  serializeSignal(user, dateSent, { ready: !!ready })

const mapping = {
  [types.MESSAGE]: message,
  [types.END_SESSION]: endSession,
  [types.TYPING_INDICATOR]: typing,
  [types.CONNECTION]: connection,
  [types.SEND_MEDICAL_DOCUMENT]: sendMedicalDocument,
  [types.REQUEST_VIDEO_CALL]: requestVideoCall,
  [types.REQUEST_VIDEO_CALL_CANCEL]: cancelVideoCallRequest,
  [types.ACCEPT_VIDEO_INVITE]: acceptVideoInvite,
  [types.REJECT_VIDEO_INVITE]: rejectVideoInvite,
  [types.END_VIDEO_CALL]: endVideoCall
}

export const getSerializer = (type) => mapping[type]

export default {
  serializeSignal,
  message,
  typing,
  endSession,
  connection,
  sendMedicalDocument,
  requestVideoCall,
  cancelVideoCallRequest,
  acceptVideoInvite,
  rejectVideoInvite,
  endVideoCall,
  getSerializer
}
