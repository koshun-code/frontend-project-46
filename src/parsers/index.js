import path from 'node:path';
import jsonparser from './jsonparser.js';
import yamlparser from './ymlparser.js';
import { getFile } from '../utils.js';

export default (file) => {
  const extention = path.extname(file).slice(1);
  switch (extention) {
    case 'json':
      return jsonparser(getFile(file));
    case 'yaml':
    case 'yml':
      return yamlparser(getFile(file));
    default:
      return 'unable extension';
  }
};
