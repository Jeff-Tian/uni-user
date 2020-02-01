const path = require('path');

module.exports = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  alias: {
    components: path.resolve(__dirname, 'src/components'),
  }
};
