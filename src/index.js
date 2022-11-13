// import fs from 'fs';
import _ from 'lodash';

const makeTree = (fileOne, fileTwo) => {
  const res = (_.sortBy(_.union(_.keys(fileOne), _.keys(fileTwo)))).map((key) => {
    const value1 = fileOne[key];
    const value2 = fileTwo[key];
    if (!_.has(fileOne, key)) {
      return { name: key, status: 'added', value: value2 };
    }
    if (!_.has(fileTwo, key)) {
      return { name: key, status: 'deleted', value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, status: 'hasChildren', children: makeTree(value1, value2) };
    }
    if (value1 !== value2) {
      return {
        name: key,
        status: 'changed',
        oldValue: value1,
        newValue: value2,
      };
    }
    return { name: key, status: 'blank', value: value1 };
  });
  return res;
};

export default makeTree;
