const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceClasses(content) {
  let newContent = content;
  const replacements = [
    { from: /\bbg-white\b(?! dark:bg-slate-900)/g, to: 'bg-white dark:bg-slate-900' },
    { from: /\bbg-slate-50\b(?! dark:bg-slate-800)/g, to: 'bg-slate-50 dark:bg-slate-800' },
    { from: /\bbg-slate-100\b(?! dark:bg-slate-800\/80)/g, to: 'bg-slate-100 dark:bg-slate-800/80' },
    { from: /\bbg-slate-200\b(?! dark:bg-slate-700)/g, to: 'bg-slate-200 dark:bg-slate-700' },
    { from: /\bbg-emerald-50\b(?! dark:bg-emerald-950\/30)/g, to: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { from: /\bbg-red-50\b(?! dark:bg-red-950\/30)/g, to: 'bg-red-50 dark:bg-red-950/30' },
    { from: /\bbg-amber-50\b(?! dark:bg-amber-950\/30)/g, to: 'bg-amber-50 dark:bg-amber-950/30' },
    { from: /\bbg-blue-50\b(?! dark:bg-blue-950\/30)/g, to: 'bg-blue-50 dark:bg-blue-950/30' },

    { from: /\btext-slate-900\b(?! dark:text-slate-50)/g, to: 'text-slate-900 dark:text-slate-50' },
    { from: /\btext-slate-800\b(?! dark:text-slate-200)/g, to: 'text-slate-800 dark:text-slate-200' },
    { from: /\btext-slate-700\b(?! dark:text-slate-300)/g, to: 'text-slate-700 dark:text-slate-300' },
    { from: /\btext-slate-600\b(?! dark:text-slate-400)/g, to: 'text-slate-600 dark:text-slate-400' },
    { from: /\btext-slate-500\b(?! dark:text-slate-400)/g, to: 'text-slate-500 dark:text-slate-400' },
    { from: /\btext-slate-400\b(?! dark:text-slate-500)/g, to: 'text-slate-400 dark:text-slate-500' },

    { from: /\bborder-slate-100\b(?! dark:border-slate-800)/g, to: 'border-slate-100 dark:border-slate-800' },
    { from: /\bborder-slate-200\b(?! dark:border-slate-800)/g, to: 'border-slate-200 dark:border-slate-800' },
    { from: /\bborder-slate-300\b(?! dark:border-slate-700)/g, to: 'border-slate-300 dark:border-slate-700' },

    { from: /\bshadow-sm\b(?! dark:shadow-none)/g, to: 'shadow-sm dark:shadow-none' },
    { from: /\bshadow-md\b(?! dark:shadow-none)/g, to: 'shadow-md dark:shadow-none' },
    { from: /\bshadow-lg\b(?! dark:shadow-none)/g, to: 'shadow-lg dark:shadow-none' },
    { from: /\bshadow-xl\b(?! dark:shadow-none)/g, to: 'shadow-xl dark:shadow-none' },
    { from: /\bshadow-2xl\b(?! dark:shadow-none)/g, to: 'shadow-2xl dark:shadow-none' },
  ];

  for (const {from, to} of replacements) {
    newContent = newContent.replace(from, to);
  }
  return newContent;
}

const dirs = ['./components', './app'];
dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir, function(filePath) {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = replaceClasses(content);
        if (content !== newContent) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log(`Updated ${filePath}`);
        }
      }
    });
  }
});
