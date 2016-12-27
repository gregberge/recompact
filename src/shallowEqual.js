import shallowEqual from 'fbjs/lib/shallowEqual'

/**
 * Returns true if objects are shallowly equal.
 *
 * @static
 * @category Utilities
 * @param {Object} a
 * @param {Object} b
 * @returns {Boolean}
 * @example
 *
 * shallowEqual({foo: 'bar'}, {foo: 'bar'}); // true
 * shallowEqual({foo: 'bar'}, {foo: 'x'}); // false
 */
export default shallowEqual
