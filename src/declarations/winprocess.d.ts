declare module 'winprocess' {
  export interface Process {
    open: () => void
    readMemory: (offset: number, length: number) => Buffer | number
    writeMemory: (offset: number, buffer: Buffer) => void
  }
  const winProcess: {
    Process: (processId: number) => Process
  }
  export default winProcess
}
