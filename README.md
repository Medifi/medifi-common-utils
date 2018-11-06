## Common library for web and mobile react apps

## Usage
```javascript
import * as utils from 'medifi-common-utils'
```


## Signal serializers/parsers
```javascript
import { Signal } from 'medifi-common-utils'

Signal.types // Object containing our signal types
Signal.parseSignal // Parses a signal regardless of type

Signal.serializers.connection(user, dateSent, ready)
Signal.serializers.inviteToVideo(user, dateSent)
Signal.serializers.respondToVideoRequest(user, dateSent, true /* response */)
Signal.serializers.message(user, dateSent, messageString)
Signal.serializers.typing(user, dateSent, isTyping)
Signal.serializers.endSession(user, dateSent)
// ... etc
let serializer = Signal.serializers.getSerializer(Signal.types.MESSAGE)
serializer(user, dateSent, messageString) // is equal to Signal.serializers.message

```

NOTE: The user object should be a user with an `id`, `fullName` and `role` property
NOTE: The message object should be a a message with an `id` and `body` property

## Signal types

### Message:

shape:

```json
{
  user: {
    id: '1',
    fullName: 'Sieg Collado',
    role: 'Doctor'
  },
  dateSent: 1231231313,
  message: 'Hello!'
}
```

### Typing

```json
{
  user: {
    id: '1',
    fullName: 'Sieg Collado',
    role: 'Doctor'
  },
  dateSent: 1232132131,
  isTyping: true // or false
}
```

### TODO

- complete readme
- move reusable methods here
