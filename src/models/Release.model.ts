/* eslint-disable camelcase */
interface Asset {
  browser_download_url: string
  name: string
}

export interface Release {
  draft: boolean
  prerelease: boolean
  assets: Asset[]
  tag_name: string
  body: string
}
