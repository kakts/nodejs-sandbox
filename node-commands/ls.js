// clone for ls command written in node.js
const fs = require('fs');
const chalk = require('chalk');
const hiddenFileReg = RegExp('^\.');
console.log('debug: ' + process.argv)

if (process.argv.length >= 3) {
  console.log(process.argv[3])
} else {
  const files = fs.readdirSync('../', {withFileTypes: true});
  let str = ''
  for (let i = 0, len = files.length; i < len; i++) {
    const file = files[i];
    if (/^\./.test(file.name)) {
      console.log('---', file.name)
      continue;
    }
    str += chalk.blue(file.name)
    if (i !== 0 && i % 5 === 0) {
      str += '\n';
    } else {
      str += '    '
    }
  }
  console.log(str)
}
