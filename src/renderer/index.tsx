import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { Store } from 'redux'
import { ConnectedRouter } from 'react-router-redux'
import { remote } from 'electron'
import { History, createMemoryHistory as createHistory } from 'history'

import { initReducer } from './reducers'
import { request } from './Request'
import { Connector } from './Connector'
import { AppView } from './components/views/AppView'
import { State, SaveState } from '../models/State.model'

export let store: Store<State>
export const connector = new Connector()

;(async () => {
  const history: History = createHistory()
  const save: SaveState = remote.getGlobal('save')
  store = initReducer(history, save)

  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path='/' component={AppView} />
      </ConnectedRouter>
    </Provider>, document.getElementById('root')
  )
})()

process.on('uncaughtException', (err: Error) => {
  console.error(err)
})
