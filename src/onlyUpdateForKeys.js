import pick from './utils/pick'
import shallowEqual from './shallowEqual'
import createHelper from './createHelper'
import shouldUpdate from './shouldUpdate'

/**
 * Prevents the component from updating unless a prop corresponding to one of the
 * given keys has updated. Uses `shallowEqual()` to test for changes.
 *
 * This is a much better optimization than the popular approach of using PureRenderMixin,
 * `shouldPureComponentUpdate()`, or `pure()` helper, because those
 * tools compare *every* prop, whereas `onlyUpdateForKeys()` only cares about the
 * props that you specify.
 *
 * @static
 * @category Higher-order-components
 * @param {String[]} propKeys The property keys that will induce a re-render.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @see shouldUpdate
 * @example
 *
 * onlyUpdateForKeys(['value'])
 */
const onlyUpdateForKeys = propKeys =>
  shouldUpdate(
    (props, nextProps) =>
      !shallowEqual(pick(nextProps, propKeys), pick(props, propKeys)),
  )

export default createHelper(onlyUpdateForKeys, 'onlyUpdateForKeys')
