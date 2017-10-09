import got from 'got'

import { resolve } from 'url'

import {
  domain
} from './variables'

export const initAccount = async apiKey => {
  try {
    const account = (await got(resolve(domain, '/api/getaccountdata'), {
      headers: {
        'Authorization': `APIKEY ${apiKey}`
      },
      json: true,
      useElectronNet: false
    })).body
    return account
  } catch (err) {
    if (err.response) {
      console.error(err.response.body)
    } else {
      console.error(err)
    }
  }
  return null
}
