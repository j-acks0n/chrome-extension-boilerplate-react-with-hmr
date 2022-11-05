// config-overrides.js which is part of react-rewired
const webpack = require("webpack");
const path = require("path");
module.exports = function override(config, env) {
  // This loader ignores .ts files in common as a workaround.
  // For some reason when common is rebuilt, react refresh
  // tries to compile .ts sources from common
  const rulesOneOf = config.module.rules[1].oneOf;
  rulesOneOf.splice(rulesOneOf.length - 1, 0, {
    test: /\.ts$/,
    include: path.join(__dirname, "..", "common"),
    use: {
      loader: path.resolve(__dirname, "config/ignore-loader.js"),
    },
  });

  return config;
};
