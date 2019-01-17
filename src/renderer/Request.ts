import axios, { AxiosInstance } from 'axios'
import { remote } from 'electron'
import * as fs from 'fs'
import * as path from 'path'

import { Release } from '../models/Release.model'
import { Server } from '../models/Server.model'
import { getCurrentServerVersion, isVersionNewer, isReleaseValid } from './utils/helper.util'

interface UpdateCheck {
  foundUpdate: boolean
  newVersionUrl?: string
  patchNotes?: string
}

class Request {
  private smmdb: AxiosInstance

  private github: AxiosInstance

  private apiKey: string = ''

  constructor () {
    this.smmdb = axios.create({
      // baseURL: 'http://localhost:8080/api',
      baseURL: 'https://smmdb.ddns.net/api/',
      responseType: 'json'
    })
    let { github: githubApiKey } = process.env.NODE_ENV === 'development'
      ? JSON.parse(fs.readFileSync(path.join(__dirname, '../../../.credentials'), {
        encoding: 'utf8'
      }))
      : undefined
    this.github = axios.create({
      baseURL: 'https://api.github.com/',
      responseType: 'json',
      auth: process.env.NODE_ENV === 'development'
        ? {
          username: 'Tarnadas',
          password: githubApiKey
        }
        : undefined
    })
  }

  /**
   * Add an API key to send authorized requests.
   *
   * @param {string} apiKey - API key to add
   */
  public addApiKey (apiKey: string): void {
    this.apiKey = apiKey
  }

  public async getNet64Servers (): Promise<Server[] | null> {
    try {
      return (await this.smmdb.request({
        method: 'get',
        url: '/getnet64servers',
        timeout: 10000
      })).data
    } catch (err) {
      console.error(err)
      return null
    }
  }

  public async updateCheck (): Promise<UpdateCheck> {
    const releases = await request.getGithubReleases()
    if (!releases) {
      console.warn('Update check failed. You might be offline')
      return {
        foundUpdate: false
      }
    }
    const version: string = process.env.VERSION || ''
    return this.getMostRecentRelease(version, releases)
  }

  private async getGithubReleases (): Promise<Release[] | null> {
    try {
      return (await this.github.request({
        method: 'get',
        url: '/repos/tarnadas/net64plus/releases'
      })).data
    } catch (err) {
      console.error(err)
      return null
    }
  }

  public async serverUpdateCheck (): Promise<UpdateCheck> {
    const releases = await request.getGithubServerReleases()
    if (!releases || releases.length === 0) {
      console.warn('Update check failed. You might be offline')
      return {
        foundUpdate: false
      }
    }
    const version = getCurrentServerVersion()
    console.log('CURRENT VERSION', version, releases)
    return this.getMostRecentRelease(version, releases)
  }

  private async getGithubServerReleases (): Promise<Release[] | null> {
    try {
      return (await this.github.request({
        method: 'get',
        url: '/repos/tarnadas/net64plus-server/releases'
      })).data
    } catch (err) {
      console.error(err)
      return null
    }
  }

  private getMostRecentRelease (version: string | undefined, releases: Release[]): UpdateCheck {
    for (const release of releases) {
      if (!isReleaseValid(release)) continue
      if (!isVersionNewer(release.tag_name, version)) continue
      for (const asset of release.assets) {
        if (asset.name == null || !asset.name.includes('64plus')) continue
        const newVersionUrl = asset.browser_download_url
        if (!newVersionUrl) continue
        return {
          foundUpdate: true,
          newVersionUrl,
          patchNotes: release.body
        }
      }
    }
    return {
      foundUpdate: false
    }
  }
}
export const request = new Request()
