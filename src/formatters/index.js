import stylish from './stylish.js';
import plain from './plain.js';

export default (ast, format) => {
  switch (format) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    default: return 'blank';
  }
};
