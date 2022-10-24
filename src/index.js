// import fs from 'fs';
import * as fs from 'node:fs';
import path from 'path';
import _ from 'lodash';

export const readFile = (insertFile) => {
  const pathFile = path.join(path.resolve(), insertFile);
  return fs.readFileSync(pathFile);
};

export const diff = (file1, file2) => {
  const fileOne = JSON.parse(readFile(file1));
  const fileTwo = JSON.parse(readFile(file2));
  const file1keys = Object.keys(fileOne);
  const file2keys = Object.keys(fileTwo);
  const unionKeys = _.union(file1keys, file2keys).sort();
  return unionKeys.map((key) => {
    const value1 = fileOne[key];
    const value2 = fileTwo[key];
    if (value1 === value2 && _.has(fileOne, key) && _.has(fileTwo, key)) {
      return { name: key, status: 'blank', value: value1 };
    }
    if (_.has(fileOne, key) && !_.has(fileTwo, key)) {
      return { name: key, status: 'deleted', value: value1 };
    }
    if (value1 !== value2 && _.has(fileOne, key) && _.has(fileTwo, key)) {
      return {
        name: key, status: 'changed', oldValue: value1, newValue: value2,
      };
    }
    return { name: key, status: 'added', value: value2 };
  });
};
