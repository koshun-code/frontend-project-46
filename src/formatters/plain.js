import _ from 'lodash';

const isString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const makeFullPath = (path) => path.join('.');

const plain = (ast) => {
  const iter = (tree, pathTo) => {
    const getString = {
      blank: () => null,
      added: (node, fullPath) => `Property '${makeFullPath(fullPath)}' was added with value: ${isString(node.value)}`,
      deleted: (node, fullPath) => `Property '${makeFullPath(fullPath)}' was removed`,
      changed: (node, fullPath) => `Property '${makeFullPath(fullPath)}' was updated. From ${isString(node.oldValue)} to ${isString(node.newValue)}`,
      hasChildren: (node, fullPath) => `${iter(node.children, fullPath)}`,
    };
    const res = tree.map((node) => {
      const fullPath = [...pathTo, node.name];
      return getString[node.status](node, fullPath);
    });
    return res.filter((str) => str !== null).join('\n');
  };
  return iter(ast, []);
};

export default plain;
