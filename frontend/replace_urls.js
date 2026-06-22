const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace double quotes
  content = content.replace(/"http:\/\/localhost:5000(.*)"/g, '`${import.meta.env.VITE_BACKEND_URL}$1`');
  
  // Replace template literals that had the URL hardcoded
  content = content.replace(/`http:\/\/localhost:5000(.*)`/g, '`${import.meta.env.VITE_BACKEND_URL}$1`');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  });
}

walkDir(srcDir);
console.log('Done.');
