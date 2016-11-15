export default (method, arg) => (
  typeof method === 'function'
    ? method(arg)
    : method
);
