import _ from 'lodash';

const indent = '    ';

const stringify = (value, level) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = (_.sortBy(_.keys(value))).map((key) => {
    const string = `    ${key}: ${stringify(value[key], level + 1)}`;
    // console.log(string);
    return `${indent.repeat(level)}${string}`;
  });
  return `{\n${result.join('\n')}\n${indent.repeat(level)}}`;
};

const stylish = (ast) => {
  const iter = (tree, offset) => {
    const stringTree = {
      blank: (node, level) => `    ${node.name}: ${stringify(node.value, level + 1)}`,
      changed: (node, level) => `  - ${node.name}: ${stringify(node.oldValue, level + 1)}\n`
   + `${indent.repeat(level)}  + ${node.name}: ${stringify(node.newValue, level + 1)}`,
      deleted: (node, level) => `  - ${node.name}: ${stringify(node.value, level + 1)}`,
      added: (node, level) => `  + ${node.name}: ${stringify(node.value, level + 1)}`,
      hasChildren: (node, level) => `    ${node.name}: ${iter(node.children, level + 1)}`,
    };
    const result = tree.map((node) => `${indent.repeat(offset)}${stringTree[node.status](node, offset)}`);
    return ['{', ...result, `${indent.repeat(offset)}}`].join('\n');
  };
  return iter(ast, 0);
};

export default stylish;
