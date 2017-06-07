import { benchOperator, series } from './utils'

series([
  () => benchOperator('defaultProps', { foo: 'bar' }),
  () => benchOperator('flattenProp', 'foo'),
  () => benchOperator('mapProps', ({ n }) => n + 1),
  () => benchOperator('onlyUpdateForKeys', ['n']),
  () => benchOperator('pure'),
  () => benchOperator('renameProp', 'n', 'x'),
  () => benchOperator('renameProps', { n: 'x' }),
  () => benchOperator('shouldUpdate', (a, b) => a === b),
  () => benchOperator('withProps', { foo: 'bar' }),
  () => benchOperator('withPropsOnChange', ['n'], ({ n }) => ({ x: n })),
  () => benchOperator('withReducer', 'state', 'dispatch', () => ({})),
  () => benchOperator('withState', 'counter', 'updateCounter', 0),
]).catch(err => {
  console.error(err)
})
