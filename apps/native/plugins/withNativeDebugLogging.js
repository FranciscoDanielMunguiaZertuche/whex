/**
 * Expo Config Plugin to add native-level debug logging
 * This helps diagnose issues before JavaScript executes
 */
const { withAppDelegate, withInfoPlist } = require("expo/config-plugins");

const DEBUG_CODE = `
  // DEBUG: Log app lifecycle for sideload debugging
  NSLog(@"[WHEX-NATIVE] AppDelegate didFinishLaunching START");
`;

const DEBUG_CODE_END = `
  NSLog(@"[WHEX-NATIVE] AppDelegate didFinishLaunching END - returning YES");
`;

function withNativeDebugLogging(config) {
  // Add logging to AppDelegate
  config = withAppDelegate(config, (modConfig) => {
    const contents = modConfig.modResults.contents;

    // Add logging at start of didFinishLaunchingWithOptions
    let modified = contents.replace(
      /(-\s*\(BOOL\)application:.*didFinishLaunchingWithOptions:.*\{)/,
      `$1\n${DEBUG_CODE}`
    );

    // Add logging before return YES
    modified = modified.replace(
      /(return\s+YES;\s*\})/,
      `${DEBUG_CODE_END}\n  $1`
    );

    modConfig.modResults.contents = modified;
    return modConfig;
  });

  return config;
}

module.exports = withNativeDebugLogging;
