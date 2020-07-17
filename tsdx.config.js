let static_files = require('rollup-plugin-static-files');

module.exports = {
  rollup(config) {
    config.plugins.push(
      static_files({
        include: ['./static'],
      })
    );
    return config;
  },
};
