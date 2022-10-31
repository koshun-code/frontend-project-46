// import fs from 'fs';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import _ from 'lodash';

export const getPath = (insertFile) => path.join(process.cwd(), insertFile);

const makeTree = (fileOne, fileTwo) => {
  const file1keys = Object.keys(fileOne);
  const file2keys = Object.keys(fileTwo);
  const unionKeys = _.union(file1keys, file2keys).sort();
  const res = unionKeys.map((key) => {
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
      blank: (node) => `  ${node.name}: ${node.value}`,
      changed: (node) => `- ${node.name}: ${node.oldValue} \n+ ${node.name}: ${node.newValue}`,
      deleted: (node) => `- ${node.name}: ${node.value}`,
      added: (node) => `+ ${node.name}: ${node.value}`,
    };
    const result = tree.map((node) => `${stringTree[node.status](node)}`);
    return ['{', ...result, '}'].join('\n');
  };
  return iter(ast);
};
export const diff = (file1, file2) => {
  console.log(typeof file1);
  const pathOne = getPath(file1);
  const pathTwo = getPath(file2);
  const fileOne = JSON.parse(fs.readFileSync(pathOne));
  const fileTwo = JSON.parse(fs.readFileSync(pathTwo));
  const tree = makeTree(fileOne, fileTwo);
  return render(tree);
};
