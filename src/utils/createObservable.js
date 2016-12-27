/* eslint-disable import/prefer-default-export */
import $$observable from 'symbol-observable'
import { config as obsConfig } from '../setObservableConfig'

const createObservable = subscribe =>
  obsConfig.fromESObservable({
    subscribe,
    [$$observable]() {
      return this
    },
  })

export default createObservable
