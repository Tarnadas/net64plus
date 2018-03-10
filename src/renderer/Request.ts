import axios, { AxiosInstance } from 'axios'

import { Release } from '../models/Release.model'
import { Server } from '../models/Server.model'

class Request {
  private axios: AxiosInstance

  private apiKey: string = ''

  constructor () {
    this.axios = axios.create({
      baseURL: 'https://smmdb.ddns.net/api/',
      responseType: 'json'
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
      return (await this.axios.request({
        method: 'get',
        url: '/getnet64servers'
      })).data
    } catch (err) {
      console.error(err)
      return null
    }
  }

  public async updateNet64Server (serverId: string): Promise<Server | null> {
    try {
      return (await this.axios.request({
        method: 'get',
        url: '/getnet64servers',
        params: {
          id: serverId
        }
      })).data[0]
    } catch (err) {
      console.error(err)
      return null
    }
  }

  public async getGithubReleases (): Promise<Release[] | null> {
    try {
      return (await this.axios.request({
        method: 'get',
        url: 'https://api.github.com/repos/tarnadas/net64plus/releases'
      })).data
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
export const request = new Request()
