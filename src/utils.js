import path from 'node:path';

import fs from 'node:fs';
import process from 'process';

export const makePath = (pathss) => path.resolve(process.cwd(), pathss);
// makePath = (paths) => path.join(__dirname, '..', ...paths);

export const getFile = (paths) => fs.readFileSync(makePath(paths), 'utf-8');
export const getExt = (fileName) => path.extname(fileName).slice(1);
