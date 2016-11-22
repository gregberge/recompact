import createSymbol from './utils/createSymbol';

let config = {
  observablesKey: createSymbol('observables'),
};

const setConfig = (_config) => {
  config = _config;
};

export const getConfig = () => config;

export default setConfig;
