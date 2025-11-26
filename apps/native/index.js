// Debug: Log that index.js is being executed
// This runs BEFORE any React code
console.log("[WHEX] index.js starting...");

// Skip unistyles during initial debug - it has native dependencies
// that might be failing silently in sideloaded context
// import "./unistyles";

import "expo-router/entry";

console.log("[WHEX] expo-router/entry imported");
