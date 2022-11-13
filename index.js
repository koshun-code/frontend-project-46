import makeTree from './src/index.js';
import parse from './src/parsers/index.js';
import { getExt } from './src/utils.js';
import render from './src/formatters/index.js';

const diff = (file1, file2, format = 'stylish') => {
  const fileOne = parse(file1, getExt(file1));
  const fileTwo = parse(file2, getExt(file2));
  const tree = makeTree(fileOne, fileTwo);
  return render(tree, format);
};

export default diff;
