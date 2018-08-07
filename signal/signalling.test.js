import Signal from './index'

const user = {
  id: '1',
  fullName: 'Sieg Collado',
  role: 'Doctor'
}

describe('serializers', () => {
  const constantDate = new Date('2018-01-01T12:00:00')
  const RealDate = global.Date

  beforeAll(() => {
    global.Date = class extends Date {
      constructor () {
        super()
        return constantDate
      }
    }
  })

  describe('serializeSignal', () => {
    it('throws error on invalid user', () => {
      expect(() => {
        Signal.serializers.serializeSignal({ name: 'foo' }, new Date())
      }).toThrow('expected user to contain id, fullName and role')
    })
  })

  describe('message', () => {
    it('matches snapshot', () => {
      const result = Signal.serializers.message(user, new Date(), 'Hello')
      expect(result).toMatchSnapshot()
    })
  })

  describe('typing', () => {
    it('matches snapshot', () => {
      const result = Signal.serializers.typing(user, new Date(), true)
      expect(result).toMatchSnapshot()
    })

    it('matches snapshot on false', () => {
      const result = Signal.serializers.typing(user, new Date(), false)
      expect(result).toMatchSnapshot()
    })
  })

  describe('end-session', () => {
    it('matches snapshot', () => {
      const result = Signal.serializers.endSession(user, new Date(), true)
      expect(result).toMatchSnapshot()
    })
  })

  describe('invite to video', () => {
    it('matches snapshot', () => {
      const result = Signal.serializers.inviteToVideo(user, new Date())
      expect(result).toMatchSnapshot()
    })
  })

  describe('connection', () => {
    it('matches snapshot', () => {
      const result = Signal.serializers.connection(user, new Date(), true)
      expect(result).toMatchSnapshot()
    })
  })
})

describe('parsing', () => {
  it('successfully parses a message signal', () => {
    const messageSignal = Signal.serializers.message(user, new Date(), 'this is a message')
    const result = Signal.parseSignal(messageSignal)
    expect(result).toEqual(expect.objectContaining({ user, message: 'this is a message' }))
  })

  it('parses a typing signal', () => {
    const typingSignal = Signal.serializers.typing(user, new Date(), true)
    const result = Signal.parseSignal(typingSignal)
    expect(result).toEqual(expect.objectContaining({ user, isTyping: true }))
  })

  it('parses an end session signal', () => {
    const endSignal = Signal.serializers.endSession(user, new Date(), true)
    const result = Signal.parseSignal(endSignal)
    expect(result).toEqual(expect.objectContaining({ user }))
  })

  it('parses an invite to video signal', () => {
    const inviteSignal = Signal.serializers.inviteToVideo(user, new Date(), true)
    const result = Signal.parseSignal(inviteSignal)
    expect(result).toEqual(expect.objectContaining({ user }))
  })

  it('parses a connection signal', () => {
    const connectionSignal = Signal.serializers.connection(user, new Date(), true)
    const result = Signal.parseSignal(connectionSignal)
    expect(result).toEqual(expect.objectContaining({ user, ready: true }))
  })
})

describe('getSerializer', () => {
  it('parses a signal message', () => {
    const serializer = Signal.serializers.getSerializer(Signal.types.MESSAGE)
    const messageSignal = serializer(user, new Date(), 'this is a message')
    const result = Signal.parseSignal(messageSignal)
    expect(result).toEqual(expect.objectContaining({ user, message: 'this is a message' }))
  })
})
