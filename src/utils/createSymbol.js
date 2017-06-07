export default name =>
  typeof Symbol === 'function' ? Symbol(name) : `@@recompact/${name}`
