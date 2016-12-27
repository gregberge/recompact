/* eslint-disable no-param-reassign */

import { isMapperComponent as isCompacted } from './createHOCFromMapper'

const compactable = Symbol('compactable')
const isCompactable = Component => typeof Component === 'function' && compactable in Component

export default (createCompactableComponent, createComponent) => (BaseComponent) => {
  if (isCompactable(BaseComponent)) {
    BaseComponent = BaseComponent[compactable]
  }

  const Component = createComponent(BaseComponent)
  Component[compactable] = createCompactableComponent(BaseComponent)

  if (isCompacted(BaseComponent)) {
    return Component[compactable]
  }

  return Component
}
