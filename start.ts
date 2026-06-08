#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs';

// Get the correct paths
const __dirname = __dirname || path.dirname(require.main!.filename);
const projectRoot = __dirname;
const distDir = path.join(projectRoot, 'dist');
const serverFile = path.join(distDir, 'server.js');

console.log(`Project Root: ${projectRoot}`);
console.log(`Dist Dir: ${distDir}`);
console.log(`Server File: ${serverFile}`);

// Check if files exist
console.log(`\nChecking if files exist:`);
console.log(`Dist exists: ${fs.existsSync(distDir)}`);
console.log(`Server.js exists: ${fs.existsSync(serverFile)}`);

if (fs.existsSync(distDir)) {
  console.log(`\nContents of dist/:`);
  fs.readdirSync(distDir).forEach((file: string) => {
    console.log(`  - ${file}`);
  });
}

// Try to load and run the server
if (fs.existsSync(serverFile)) {
  console.log(`\nLoading server from: ${serverFile}`);
  require(serverFile);
} else {
  console.error(`\n❌ ERROR: Server file not found at ${serverFile}`);
  console.error('Build may have failed. Check build output above.');
  process.exit(1);
}
