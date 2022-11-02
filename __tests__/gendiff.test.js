import { expect } from '@jest/globals';
import fs from 'fs';
import diff from '../src/index.js';
import { makePath } from '../src/utils.js';

const getFixturePath = (filename) => makePath(['__fixtures__', filename]);

test('diff', () => {
  expect(diff('file1.json', 'file2.json')).toEqual(fs.readFileSync(getFixturePath('res.txt'), 'utf8'));
});
