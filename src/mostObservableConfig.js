/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import { from, Stream } from 'most'

const config = {
  fromESObservable: from || Stream.from,
}

export default config
