class NonTrackingDummyWeakMap {
  get() {}
  set() {}
  has() {
    return false
  }
}

export default WeakMap || NonTrackingDummyWeakMap
