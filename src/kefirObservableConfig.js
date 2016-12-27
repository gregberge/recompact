/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import Kefir from 'kefir'

const config = {
  fromESObservable: Kefir.fromESObservable,
  toESObservable: stream => stream.toESObservable(),
}

export default config
