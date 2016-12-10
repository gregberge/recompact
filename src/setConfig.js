import createSymbol from './utils/createSymbol';

let config = {
  observablesKey: createSymbol('observables'),
};

/**
 * Set the config of Recompact.
 *
 * @static
 * @category Config
 * @param {Object} options
 * @example
 *
 * setConfig({observablesKey: 'observables'});
 */
const setConfig = (_config) => {
  config = _config;
};

export const getConfig = () => config;

export default setConfig;
