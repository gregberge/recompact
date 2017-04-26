# Clean it
rm -rf lib/

# Compile babel sources
NODE_ENV=production babel --ignore src/__tests__,src/__benchmarks__ src -d lib

# Compile webpack umd
NODE_ENV=production webpack

# Copy package.json
cp package.json lib/package.json
