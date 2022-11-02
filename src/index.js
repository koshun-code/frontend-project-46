// import fs from 'fs';
import _ from 'lodash';
import { getFile } from './utils.js';

const makeTree = (fileOne, fileTwo) => {
  const res = (_.sortBy(_.union(_.keys(fileOne), _.keys(fileTwo)))).map((key) => {
    const value1 = fileOne[key];
    const value2 = fileTwo[key];
    if (_.has(fileOne, key) && _.has(fileTwo, key)) {
      if (value1 === value2) {
        return { name: key, status: 'blank', value: value1 };
      }
      if (value1 !== value2) {
        return {
          name: key, status: 'changed', oldValue: value1, newValue: value2,
        };
      }
    }
    if (_.has(fileOne, key) && !_.has(fileTwo, key)) {
      return { name: key, status: 'deleted', value: value1 };
    }
    return { name: key, status: 'added', value: value2 };
  });
  return res;
};
const render = (ast) => {
  const iter = (tree) => {
    const stringTree = {
      blank: (node) => `    ${node.name}: ${node.value}`,
      changed: (node) => `  - ${node.name}: ${node.oldValue}\n  + ${node.name}: ${node.newValue}`,
      deleted: (node) => `  - ${node.name}: ${node.value}`,
      added: (node) => `  + ${node.name}: ${node.value}`,
    };
    const result = tree.map((node) => `${stringTree[node.status](node)}`);
    return ['{', ...result, '}'].join('\n');
  };
  return iter(ast);
};
const diff = (file1, file2) => {
  const fileOne = JSON.parse(getFile(file1));
  const fileTwo = JSON.parse(getFile(file2));
  const tree = makeTree(fileOne, fileTwo);
  return render(tree);
};
export default diff;
