/* eslint-disable no-param-reassign */

import { isMapperComponent as isCompacted } from './createHOCFromMapper'
import WeakMap from './WeakMap'

const allCompactableComponents = new WeakMap()
const isCompactable = Component => allCompactableComponents.has(Component)
const getCompactableComponent = Component =>
  allCompactableComponents.get(Component)
const setCompactableComponent = (Component, CompactableComponent) =>
  allCompactableComponents.set(Component, CompactableComponent)

export default (
  createCompactableComponent,
  createComponent,
) => BaseComponent => {
  if (isCompactable(BaseComponent)) {
    BaseComponent = getCompactableComponent(BaseComponent)
  }

  const Component = createComponent(BaseComponent)
  setCompactableComponent(Component, createCompactableComponent(BaseComponent))

  if (isCompacted(BaseComponent)) {
    return getCompactableComponent(Component)
  }

  return Component
}
