// let static_files = require('rollup-plugin-static-files');
const css = require('rollup-plugin-css-only')

module.exports = {
  rollup(config) {
    config.plugins.push(
      // static_files({
      //   include: ['./static'],
      // })
      css({ output: 'dist/bundle.css' })
    );
    return config;
  },
};
