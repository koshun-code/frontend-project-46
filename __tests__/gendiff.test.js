import { expect } from '@jest/globals';
import fs from 'fs';
import diff from '../src/index.js';
import { makePath } from '../src/utils.js';

const getFixturePath = (filename) => makePath(['__fixtures__', filename]);

const data = [
  ['file1.json', 'file2.json', 'res.txt'],
  ['file1.yml', 'file2.yml', 'res.txt'],
];
test.each(data)('Compare %s with %s to be %s', (file1, file2, expected) => {
  expect(diff(file1, file2)).toEqual(fs.readFileSync(getFixturePath(expected), 'utf8'));
});
