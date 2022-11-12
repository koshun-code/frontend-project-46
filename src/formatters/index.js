import stylish from './stylish.js';

export default (ast, format) => {
  switch (format) {
    case 'stylish':
      return stylish(ast);
    default: return 'blank';
  }
};
