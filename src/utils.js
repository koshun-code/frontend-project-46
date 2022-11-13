import { fileURLToPath } from 'url';
import path from 'node:path';
import { dirname } from 'path';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const makePath = (paths) => path.join(__dirname, '..', ...paths);
export const getFile = (paths) => fs.readFileSync(makePath(paths), 'utf-8');
export const getExt = (fileName) => path.extname(fileName).slice(1);
