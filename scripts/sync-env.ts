#!/usr/bin/env bun

/**
 * Syncs the server URL across all .env files
 * Usage: bun scripts/sync-env.ts [ip-address]
 *
 * If no IP is provided, it will auto-detect your local network IP
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PORT = 3000;

// Regex patterns declared at top level for performance
const PREFERRED_IPV4_REGEX = /IPv4.*?:\s*(192\.168\.\d+\.\d+)/;
const ANY_IPV4_REGEX = /IPv4.*?:\s*(\d+\.\d+\.\d+\.\d+)/;

const getLocalIP = (): string => {
  try {
    // Windows: parse ipconfig output
    const output = execSync("ipconfig", { encoding: "utf-8" });
    const lines = output.split("\n");

    // Look for IPv4 addresses, prefer 192.168.x.x
    for (const line of lines) {
      const match = line.match(PREFERRED_IPV4_REGEX);
      if (match?.[1]) {
        return match[1];
      }
    }

    // Fallback to any IPv4 that's not localhost
    for (const line of lines) {
      const match = line.match(ANY_IPV4_REGEX);
      if (match?.[1] && !match[1].startsWith("127.")) {
        return match[1];
      }
    }
  } catch {
    console.error("Failed to auto-detect IP address");
  }

  return "localhost";
};

const updateEnvFile = (filePath: string, updates: Record<string, string>) => {
  if (!existsSync(filePath)) {
    console.log(`  ⚠️  File not found: ${filePath}`);
    return;
  }

  let content = readFileSync(filePath, "utf-8");
  let modified = false;

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, "m");
    if (regex.test(content)) {
      const oldValue = content.match(regex)?.[0];
      content = content.replace(regex, `${key}=${value}`);
      if (oldValue !== `${key}=${value}`) {
        modified = true;
        console.log(`  ✓ ${key}=${value}`);
      }
    }
  }

  if (modified) {
    writeFileSync(filePath, content);
  } else {
    console.log("  (no changes needed)");
  }
};

// Main
const ip = process.argv[2] || getLocalIP();
const serverUrl = `http://${ip}:${PORT}`;

console.log(`\n🔄 Syncing environment files with: ${serverUrl}\n`);

const rootDir = join(import.meta.dir, "..");

console.log("📱 apps/native/.env");
updateEnvFile(join(rootDir, "apps/native/.env"), {
  EXPO_PUBLIC_SERVER_URL: serverUrl,
});

console.log("\n🖥️  apps/server/.env");
updateEnvFile(join(rootDir, "apps/server/.env"), {
  BETTER_AUTH_URL: serverUrl,
});

// Write to a JSON file that GitHub Actions can read
const configPath = join(rootDir, "server-config.json");

// Check if config changed
let configChanged = false;
if (existsSync(configPath)) {
  try {
    const existingConfig = JSON.parse(readFileSync(configPath, "utf-8"));
    configChanged = existingConfig.serverUrl !== serverUrl;
  } catch {
    configChanged = true;
  }
} else {
  configChanged = true;
}

const config = { serverUrl };
writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log("\n📄 server-config.json");
console.log(`  ✓ serverUrl=${serverUrl}`);

// Auto-commit and push if config changed
if (configChanged) {
  console.log("\n🚀 IP changed! Auto-committing and pushing...");
  try {
    execSync("git add server-config.json", { cwd: rootDir, stdio: "inherit" });
    execSync('git commit -m "chore: update server ip"', {
      cwd: rootDir,
      stdio: "inherit",
    });
    execSync("git push", { cwd: rootDir, stdio: "inherit" });
    console.log("   ✓ Pushed to remote!");
  } catch {
    console.log("   ⚠️  Auto-push failed (maybe no changes or not a git repo)");
  }
} else {
  console.log("\n   (IP unchanged, no commit needed)");
}

console.log("\n✅ Done!\n");
