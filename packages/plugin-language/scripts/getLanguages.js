const json = require('../src/responses.json');

console.log(Object.keys(json).map(a => `'${a}'`).join(' | '))