import { expect } from '@jest/globals';
import fs from 'fs';
import diff from '../index.js';
import { makePath } from '../src/utils.js';

const getFixturePath = (filename) => makePath(['__fixtures__', filename]);

const dataStylish = [
  ['/__fixtures__/file1.json', '/__fixtures__/file2.json', 'stylish.txt', 'stylish'],
  ['/__fixtures__/file1.yml', '/__fixtures__/file2.yml', 'stylish.txt', 'stylish'],
  ['/__fixtures__/file1.json', '/__fixtures__/file2.json', 'plain.txt', 'plain'],
  ['/__fixtures__/file1.yml', '/__fixtures__/file2.yml', 'plain.txt', 'plain'],
  ['/__fixtures__/file1.json', '/__fixtures__/file2.json', 'json.txt', 'json'],
  ['/__fixtures__/file1.yml', '/__fixtures__/file2.yml', 'json.txt', 'json'],
];
test.each(dataStylish)('Compare %s with %s to be %s', (file1, file2, expected, format) => {
  expect(diff(file1, file2, format)).toEqual(fs.readFileSync(getFixturePath(expected), 'utf8'));
});
