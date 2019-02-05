import './NewVersionDialog.scss'

import * as React from 'react'
import { shell } from 'electron'
import * as marked from 'marked'

import { SMMButton } from '../buttons/SMMButton'
import { request } from '../../Request'

interface NewVersionDialogProps {
  patchNotes: string
  versionUrl: string
  autoUpdate: boolean
  onClose?: () => void
  onFinish?: (buffer: ArrayBuffer) => void
}

interface NewVersionDialogState {
  progress: number
  loaded?: number
  total?: number
}

export class NewVersionDialog extends React.PureComponent<NewVersionDialogProps, NewVersionDialogState> {
  private patchNotesRenderer: HTMLDivElement | null = null

  constructor (props: NewVersionDialogProps) {
    super(props)
    this.state = {
      progress: 0
    }
    this.onClose = this.onClose.bind(this)
    this.onProgress = this.onProgress.bind(this)
  }

  private onClose (): void {
    const { onClose } = this.props
    if (onClose) onClose()
  }

  public componentDidMount (): void {
    const { autoUpdate } = this.props
    if (autoUpdate) this.startAutoUpdate()
    if (!this.props.patchNotes || !this.patchNotesRenderer) return
    this.patchNotesRenderer.innerHTML = marked(this.props.patchNotes)
    const nodes: NodeListOf<HTMLDivElement> = this.patchNotesRenderer.querySelectorAll('.markdown a')
    for (let i = 0; i < nodes.length; i++) {
      const href = nodes[i].getAttribute('href')
      nodes[i].removeAttribute('href')
      nodes[i].onclick = () => {
        if (!href) return
        shell.openExternal(href)
      }
    }
  }

  private async startAutoUpdate (): Promise<void> {
    const { versionUrl, onFinish } = this.props
    if (!onFinish) {
      console.error('NewVersionArea: onFinish must be defined')
      return
    }
    try {
      const res = await request.downloadServerVersion(versionUrl, this.onProgress)
      if (res.status !== 200) throw new Error()
      onFinish(res.data)
    } catch (err) {
    }
  }

  private onProgress (progressEvent: ProgressEvent): void {
    const { loaded, total } = progressEvent
    const progress = loaded / total
    this.setState({
      progress,
      loaded,
      total
    })
  }

  public render (): JSX.Element {
    const { autoUpdate, versionUrl } = this.props
    const { progress, loaded, total } = this.state
    const loadedMB = loaded ? `${(loaded / (1024 * 1024)).toFixed(2)}MB` : ''
    const totalMB = total ? `${(total / (1024 * 1024)).toFixed(2)}MB` : ''
    return (
      <div className='new-version-dialog-wrapper'>
        <div className='new-version-dialog'>
          <div className='new-version-dialog-description'>
            <h2>A new version is available</h2>
            <div
              className='markdown'
              style={{
                width: '100%',
                flex: '1 0 auto'
              }}
              ref={ x => { this.patchNotesRenderer = x } }
            />
          </div>
          {
            autoUpdate &&
            <div className='new-version-dialog-progress'>
              <progress
                className={`new-version-dialog-progress${progress == null ? ' global-invisible' : ''}`}
                value={progress}
              ></progress>
              <div>
                { loadedMB } / { totalMB }
              </div>
            </div>
          }
          {
            /* eslint-disable */
            !autoUpdate &&
            <>
              <SMMButton
                link={versionUrl} external
                text='Download'
                iconSrc='img/net64.svg'
              />
              <SMMButton
                onClick={this.onClose}
                text='Ignore'
                iconSrc='img/cancel.svg'
                styles={{
                  icon: {
                    padding: '4px'
                  }
                }}
              />
            </>
            /* eslint-enable */
          }
        </div>
      </div>
    )
  }
}
