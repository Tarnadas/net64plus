module.exports = function getCompatMin (currentVersion) {
  const [ major, minor ] = currentVersion.split('.').map(n => Number(n))
  if (major === 2 && minor === 1) return [ '2', '0' ]
  if (major === 2 && minor === 2) return [ '2', '0' ]
  throw new Error(`Compatibility list found unknown version ${currentVersion}`)
}
