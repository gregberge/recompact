/* eslint-disable class-methods-use-this */
class NonTrackingDummyWeakMap {
  get() {
    return this
  }
  set() {
    return this
  }
  has() {
    return false
  }
}

export default (typeof WeakMap === 'undefined'
  ? NonTrackingDummyWeakMap
  : WeakMap)
