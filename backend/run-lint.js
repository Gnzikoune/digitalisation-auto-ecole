const cp = require('child_process');
try {
  let output = cp.execSync('npx eslint "src/**/*.ts"', { encoding: 'utf8' });
  console.log(output);
} catch (e) {
  console.log(e.stdout);
}
