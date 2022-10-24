import { program } from 'commander';
import { diff } from './index.js';

export default () => {
  program
    .version('1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f --format <type>', 'output format')
    .arguments('<path1>, <path2>')
    .action((path1, path2) => {
      console.log(diff(path1, path2));
    });
  program.parse();
};
