import React from 'react'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import renameProp from 'recompose/renameProp'
import withHandlers from 'recompose/withHandlers'

export default compose(
  setDisplayName('RecomposeCounter'),
  pure,
  withState('value', 'onChange', 1),
  renameProp('value', 'count'),
  withHandlers({
    onIncrement: ({ count, onChange }) => () => onChange(count + 1),
  }),
)(({ onIncrement, count }) => (
  <button onClick={onIncrement}>{count}</button>
))
