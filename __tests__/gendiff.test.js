import { expect } from '@jest/globals';
import fs from 'fs';
import diff from '../src/index.js';
import { makePath } from '../src/utils.js';

const getFixturePath = (filename) => makePath(['__fixtures__', filename]);

const data = [
  // ['/__fixtures__/file1.json', '/__fixtures__/file2.json', 'res.txt'],
  // ['/__fixtures__/file1.yml', '/__fixtures__/file2.yml', 'res.txt'],
  ['/__fixtures__/file11.json', '/__fixtures__/file12.json', 'res1.txt'],
  ['/__fixtures__/file11.yml', '/__fixtures__/file12.yml', 'res1.txt'],
];
test.each(data)('Compare %s with %s to be %s', (file1, file2, expected) => {
  expect(diff(file1, file2)).toEqual(fs.readFileSync(getFixturePath(expected), 'utf8'));
});
