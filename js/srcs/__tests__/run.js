const { Parser } = require('../src/Parser');
const assert = require('assert');

// List of tests
const tests = [
    require('./literal-test.js'),
    require('./statement-list-test.js'),
    require('./block-test.js'),
    require('./empty-statement-test.js'),
];
const parser = new Parser();

function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected)
}

tests.forEach(testRun => testRun(test));

console.log('all assertions passed!')