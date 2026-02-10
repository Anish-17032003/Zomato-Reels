const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexFile = path.join(distDir, 'index.html');
const targetFile = path.join(distDir, '200.html');

if (!fs.existsSync(indexFile)) {
  console.error('index.html not found in dist/. Run build first.');
  process.exit(1);
}

fs.copyFileSync(indexFile, targetFile);
console.log('Copied index.html to 200.html');
