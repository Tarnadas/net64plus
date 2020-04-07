import { remote } from 'electron'
import { extract } from 'tar'

import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

import { Release } from '../../models/Release.model'

const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)

export function getCurrentServerVersion (): string | undefined {
  const serverPath = getServerPath()
  let currentVersion: string | undefined
  for (const serverPathVersion of fs.readdirSync(serverPath)) {
    const serverVersionTag = serverPathVersion.replace(serverPath, '').slice(0, -1)
    if (isVersionNewer(serverVersionTag, currentVersion)) continue
    currentVersion = serverPathVersion
  }
  if (currentVersion) saveAndExtractServer(currentVersion)
  return currentVersion
}

export async function saveAndExtractServer (version: string, buffer?: ArrayBuffer): Promise<string> {
  const serverPath = getServerPath()
  const serverVersionPath = path.join(serverPath, version)
  try {
    await mkdir(serverVersionPath)
  } catch (err) {}
  const gzFile = path.join(serverVersionPath, 'net64plus-server.tar.gz')
  if (buffer) await writeFile(gzFile, Buffer.from(buffer))
  let files = await readdir(serverVersionPath)
  for (const file of files) {
    if (file.includes('net64plus-server') && !file.includes('tar.gz')) {
      return path.join(serverVersionPath, file)
    }
  }
  await extract({
    cwd: serverVersionPath,
    file: gzFile,
    newer: true
  })
  files = await readdir(serverVersionPath)
  for (const file of files) {
    if (file.includes('net64plus-server') && !file.includes('tar.gz')) {
      return path.join(serverVersionPath, file)
    }
  }
  return ''
}

function getServerPath (): string {
  const serverPath = path.join(remote.app.getPath('userData'), 'server')
  if (!fs.existsSync(serverPath)) {
    fs.mkdirSync(serverPath)
  }
  return serverPath
}

export function isReleaseValid (release: Release): boolean {
  if (release.draft == null || release.draft) return false
  if (release.prerelease == null || release.prerelease) return false
  if (release.assets == null || release.assets.length === 0) return false
  if (!release.tag_name) return false
  return true
}

export function isVersionNewer (versionTag: string, currentVersionTag?: string): boolean {
  let [major, minor, patch] = versionTag.split('.')
    .map(mapVersionToNumber)
  let [currentMajor, currentMinor, currentPatch] = currentVersionTag
    ? currentVersionTag.split('.')
      .map(mapVersionToNumber)
    : [0, 0, 0]
  if (patch == null) patch = 0
  if (currentPatch == null) currentPatch = 0
  const versionValue = major * 10000 + minor * 100 + patch
  const currentVersionValue = currentMajor * 10000 + currentMinor * 100 + currentPatch
  return versionValue > currentVersionValue
}

function mapVersionToNumber (versionNumber: string): number {
  return versionNumber != null ? parseInt(versionNumber) : 0
}
