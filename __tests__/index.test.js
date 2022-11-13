import { expect } from '@jest/globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import diff from '../index.js';
import { getFile, makePath } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const prefix = '__fixtures__';

const getFixturePath = (filename) => makePath(`${__dirname}/../${prefix}/${filename}`);

const dataStylish = [
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish.txt', 'stylish'],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish.txt', 'stylish'],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'plain.txt', 'plain'],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain.txt', 'plain'],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'json.txt', 'json'],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json.txt', 'json'],
];
test.each(dataStylish)('Compare %s with %s to be %s', (file1, file2, expected, format) => {
  expect(diff(file1, file2, format)).toEqual(getFile(getFixturePath(expected), 'utf8'));
});
