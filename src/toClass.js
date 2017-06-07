import React, { Component } from 'react'
import getDisplayName from './getDisplayName'
import isClassComponent from './isClassComponent'

/**
 * Takes a function component and wraps it in a class. This can be used as a
 * fallback for libraries that need to add a ref to a component, like Relay.
 *
 * If the base component is already a class, it returns the given component.
 *
 * @static
 * @category Higher-order-components
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const Component = toClass(() => <div />);
 * <Component ref="foo" /> // A ref can be used because Component is a class
 */

const toClass = BaseComponent => {
  if (isClassComponent(BaseComponent)) {
    return BaseComponent
  }

  class ToClass extends Component {
    render() {
      if (typeof BaseComponent === 'string') {
        return <BaseComponent {...this.props} />
      }

      return BaseComponent(this.props, this.context)
    }
  }

  ToClass.displayName = getDisplayName(BaseComponent)
  ToClass.propTypes = BaseComponent.propTypes
  ToClass.contextTypes = BaseComponent.contextTypes
  ToClass.defaultProps = BaseComponent.defaultProps

  return ToClass
}

export default toClass
