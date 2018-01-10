import '../mocks/WinProcess'

import Connection from './Connection'
import Emulator from './Emulator'

describe('Connection', () => {
  let connection
  beforeEach(() => {
    connection = new Connection({
      server: {
        domain: 'some.domain.com',
        ip: '89.172.162.88',
        port: 3678
      }
    })
  })
  describe('#sendMemoryData()', () => {
    it('should work', () => {
      connection.emulator = new Emulator()
    })
  })
})
