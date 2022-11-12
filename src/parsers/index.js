import jsonparser from './jsonparser.js';
import yamlparser from './ymlparser.js';
import { getFile } from '../utils.js';

export default (file, extention) => {
  switch (extention) {
    case 'json':
      return jsonparser(getFile([file]));
    case 'yaml':
    case 'yml':
      return yamlparser(getFile([file]));
    default:
      return 'unable extension';
  }
};
