import identity from './identity';

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return identity;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  const last = funcs[funcs.length - 1];

  return (...args) => {
    let result = last(...args);
    for (let i = funcs.length - 2; i >= 0; i -= 1) {
      const f = funcs[i];
      result = f(result);
    }
    return result;
  };
}
