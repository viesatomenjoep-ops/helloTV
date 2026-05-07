import fs from 'fs';
import path from 'path';

const checkDir = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for multiple useState definitions of the same variable
      const lines = content.split('\n');
      const states = new Set();
      for (let i=0; i<lines.length; i++) {
        const match = lines[i].match(/const \s*\[\s*([a-zA-Z0-9_]+)\s*,/);
        if (match) {
          const v = match[1];
          if (states.has(v)) {
            console.log(`Duplicate state ${v} in ${fullPath}:${i+1}`);
          }
          states.add(v);
        }
      }
    }
  }
};

checkDir('src');
