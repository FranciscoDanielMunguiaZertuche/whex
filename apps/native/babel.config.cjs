"use strict";
module.exports = (api) => {
  api.cache(true);
  const plugins = [];

  // TEMPORARILY DISABLED for sideload debugging
  // plugins.push([
  //   "react-native-unistyles/plugin",
  //   {
  //     root: __dirname,
  //   },
  // ]);

  // Reanimated plugin must be last
  plugins.push("react-native-reanimated/plugin");

  return {
    presets: ["babel-preset-expo"],

    plugins,
  };
};
