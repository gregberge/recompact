export default (condition, message) => {
  if (!condition) throw new Error(message)
}
