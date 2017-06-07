export default (fnOrObject, a, b, c) =>
  typeof fnOrObject === 'function' ? fnOrObject(a, b, c) : fnOrObject
