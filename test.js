const { spawn } = require('child_process');
const grep = spawn('florence', ['-u florence.conf']);

grep.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});

// Send SIGHUP to process
grep.kill('SIGHUP');
