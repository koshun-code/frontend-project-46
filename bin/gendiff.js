#!/usr/bin/env node

import { program } from 'commander';
import diff from '../index.js';

program
  .version('1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<file1>, <file2>')
  .action((file1, file2, options) => {
    console.log(diff(file1, file2, options.format));
  })
  .parse(process.argv);
