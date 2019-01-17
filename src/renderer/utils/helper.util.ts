import { remote } from 'electron'

import * as fs from 'fs'
import * as path from 'path'

import { Release } from '../../models/Release.model'

export function getCurrentServerVersion (): string | undefined {
  const serverPath = getServerPath()
  let currentVersion: string | undefined
  for (const serverPathVersion of fs.readdirSync(serverPath)) {
    const serverVersionTag = serverPathVersion.replace(serverPath, '').slice(0, -1)
    if (isVersionNewer(serverVersionTag, currentVersion)) continue
    currentVersion = serverPathVersion
  }
  return currentVersion
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
    : [ 0, 0, 0 ]
  if (patch == null) patch = 0
  const versionValue = major * 10000 + minor * 100 + patch
  const currentVersionValue = currentMajor * 10000 + currentMinor * 100 + currentPatch
  return versionValue > currentVersionValue
}

function mapVersionToNumber (versionNumber: string): number {
  return versionNumber != null ? parseInt(versionNumber) : 0
}
