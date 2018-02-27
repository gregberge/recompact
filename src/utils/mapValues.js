export default (obj, fn) =>
  Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key) // eslint-disable-line no-param-reassign
    return result
  }, {})
