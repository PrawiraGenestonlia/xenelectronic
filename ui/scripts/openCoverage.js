const path = require('path');
const { exec } = require('child_process');

const url = path.resolve(__dirname, '../coverage/lcov-report/index.html');
const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
console.log(`${start} ${url}`);
exec(`${start} ${url}`);
