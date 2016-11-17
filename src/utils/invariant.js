export default (condition, message) => {
  if (!condition) {
    const error = new Error(message);
    error.framesToPop = 1; // Discard the invariant's own frame.

    throw error;
  }
};
