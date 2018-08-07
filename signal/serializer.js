import * as types from './types'

const serializeSignal = (user, dateSent = null, payload = null) => {
  const date = new Date(dateSent).getTime() // if null, date today is sent


  if (!user.id || !user.fullName || !user.role) {
    throw new Error('expected user to contain id, fullName and role')
  }

  const data = Object.assign({}, payload, { dateSent: date }, { user })

  return JSON.stringify(data)
}

const message = (user, dateSent, message) =>
  serializeSignal(user, dateSent, { message })

const typing = (user, dateSent, isTyping = true) =>
  // cast anything to boolean
  serializeSignal(user, dateSent, { isTyping: !!isTyping })

const endSession = (user, dateSent) =>
  serializeSignal(user, dateSent, null)

const inviteToVideo = (user, dateSent) =>
  serializeSignal(user, dateSent, null)

const connection = (user, dateSent, ready = true) =>
  serializeSignal(user, dateSent, { ready: !!ready })

const mapping = {
  [types.MESSAGE]: message,
  [types.INVITE_VIDEO]: inviteToVideo,
  [types.END_SESSION]: endSession,
  [types.TYPING_INDICATOR]: typing,
  [types.CONNECTION]: connection
}

export const getSerializer = (type) => mapping[type]

export default {
  serializeSignal,
  message,
  typing,
  endSession,
  inviteToVideo,
  connection,
  getSerializer
}
