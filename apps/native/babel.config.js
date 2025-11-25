export default (api) => {
  api.cache(true);
  const plugins = [];

  plugins.push([
    "react-native-unistyles/plugin",
    {
      root: import.meta.dirname,
    },
  ]);
  plugins.push("react-native-reanimated/plugin");

  return {
    presets: ["babel-preset-expo"],

    plugins,
  };
};
