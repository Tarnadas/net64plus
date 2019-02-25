const packager = require('electron-packager')
const rimraf = require('rimraf')
const fs = require('fs')
const path = require('path')

const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const out = path.normalize(`./release/${packageJson.version}`)
if (!fs.existsSync('./release')) {
  fs.mkdirSync('./release')
}
if (!fs.existsSync(out)) {
  fs.mkdirSync(out)
}

packager({
  name: 'Net64+',
  dir: './build',
  out,
  arch: 'x64',
  platform: 'win32',
  appVersion: packageJson.version,
  icon: './build/img/icon.ico',
  overwrite: true
}, (err, appPaths) => {
  if (err) throw err
  fs.writeFileSync(path.join(appPaths[0], 'resources/app/package.json'), JSON.stringify(packageJson))
  fs.mkdirSync(path.join(appPaths[0], `patches`))
  fs.readdirSync('./build/patches').map(val => `./build/patches/${val}`).forEach(file => {
    fs.createReadStream(file).pipe(fs.createWriteStream(path.join(appPaths[0], `patches/${file.split('patches/')[1]}`)))
  })
  rimraf(path.join(appPaths[0], 'resources/app/patches'), () => {})
})
