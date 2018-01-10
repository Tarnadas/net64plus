export default jest.mock('winprocess', () => ({
  Process: processId => ({
    open: () => {},
    readMemory: (offset, length) => {
      return Buffer.alloc(length)
    },
    writeMemory: (offset, buffer) => {}
  })
}))
