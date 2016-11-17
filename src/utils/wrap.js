export default fn => (...args) => (
  typeof fn === 'function'
    ? fn(...args)
    : fn
);
