export default jest.mock('winprocess', () => ({
  Process: (processId: number) => ({
    open: () => {},
    readMemory: (offset: number, length: number) => {
      return Buffer.alloc(length)
    },
    writeMemory: (offset: number, buffer: Buffer) => {}
  })
}))
