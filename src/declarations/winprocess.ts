type winProcess = {
  Process: (processId: number) => Process
}
export interface Process {
  open: () => void
  readMemory: (offset: number, length: number) => Buffer | number
  writeMemory: (offset: number, buffer: Buffer) => void
}
export default winProcess
