export function buf2hex (buffer: Uint8Array): string {
  return Array.prototype.map.call(buffer, (x: any) => ('00' + x.toString(16)).slice(-2)).join(' ')
}
