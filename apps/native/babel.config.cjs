"use strict";
module.exports = (api) => {
  api.cache(true);
  const plugins = [];

  // Reanimated plugin must be last
  plugins.push("react-native-reanimated/plugin");

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],

    plugins,
  };
};
