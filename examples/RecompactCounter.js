import React from 'react'
import setDisplayName from '../src/setDisplayName'
import compose from '../src/compose'
import pure from '../src/pure'
import withState from '../src/withState'
import renameProp from '../src/renameProp'
import withHandlers from '../src/withHandlers'

export default compose(
  setDisplayName('RecompactCounter'),
  pure,
  withState('value', 'onChange', 1),
  renameProp('value', 'count'),
  withHandlers({
    onIncrement: ({ count, onChange }) => () => onChange(count + 1),
  }),
)(({ onIncrement, count }) => (
  <button onClick={onIncrement}>{count}</button>
))
