import { program } from 'commander';
import diff from './index.js';

export default () => {
  program
    .version('1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<file1>, <file2>')
    .action((file1, file2) => {
      console.log(diff(file1, file2, program.format));
    });
  program.parse();
};
