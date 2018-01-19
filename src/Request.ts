import axios, { AxiosInstance } from 'axios'

import { Release } from './models/Release.model'
import { Server } from './models/Server.model'

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

  /**
   * Make a request to receive account data.
   *
   * @returns {Promise<object | false>} Object with account data or false on error
   */
  /* public async getAccountData () {
    if (!this.apiKey) {
      throw new Error('You were trying to get account data before specifying an API key')
    }
    try {
      return (await this.axios.request({
        method: 'get',
        url: '/getaccountdata',
        headers: {
          'Authorization': `APIKEY ${this.apiKey}`
        }
      })).data
    } catch (err) {
      console.error(err)
      return false
    }
  } */

  public async getNet64Servers (): Promise<Server[] | false> {
    try {
      return (await this.axios.request({
        method: 'get',
        url: '/getnet64servers'
      })).data
    } catch (err) {
      console.error(err)
      return false
    }
  }

  public async updateNet64Server (serverId: string): Promise<Server | boolean> {
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
      return false
    }
  }

  public async getGithubReleases (): Promise<Release[] | boolean> {
    try {
      return (await this.axios.request({
        method: 'get',
        url: 'https://api.github.com/repos/tarnadas/net64plus/releases'
      })).data
    } catch (err) {
      console.error(err)
      return false
    }
  }
}
export const request = new Request()
