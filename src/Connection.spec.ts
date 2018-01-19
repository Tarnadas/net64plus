import '../mocks/WinProcess'

import { Connection } from './Connection'
import { Emulator } from './Emulator'

describe('Connection', () => {
  let connection: Connection

  beforeEach(() => {
    connection = new Connection({
      server: {
        domain: 'some.domain.com',
        ip: '89.172.162.88',
        port: 3678
      },
      emulator: new Emulator(0, 0),
      username: 'username',
      characterId: 0,
      onConnect: () => {},
      onError: (err: Error) => {
        if (err) throw err
      }
    })
  })
  describe('#sendMemoryData()', () => {
    it('should work', () => {
    })
  })
})
