export default fn => (a, b, c) => (
  typeof fn === 'function'
    ? fn(a, b, c)
    : fn
);
