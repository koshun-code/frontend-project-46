import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'node:fs';
import { diff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFilePath = (filename) => path.join(__dirname, '..', filename);
test('gendiff', () => {
  expect(diff(fs.readFileSync(getFilePath('file1.json')), fs.readFileSync(getFilePath('file2.json')))).toEqual(getFixturePath('res.txt'));
});
