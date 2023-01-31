import arg from 'arg';
import { existsSync, readFileSync } from 'fs';
import process from 'process';
import generateReports from './services/reporter';

const args = arg({
  // Types
  '--help': Boolean,
  '--customers': String,
  '--products': String,
  '--orders': String,
});

function showHelpMessage() {
  console.log(
    `
  Usage:
    --customers [file_path] | required
    --products [file_path] | required
    --orders [file_path] | required
  `,
  );
}

function checkArgs() {
  if (args['--help']) {
    showHelpMessage();
  } else if (!(args['--customers'] && args['--orders'] && args['--products'])) {
    showHelpMessage();
  }
}

function loadFile(path: string): string {
  if (existsSync(path)) {
    return readFileSync(path).toString();
  }

  throw new Error(`File [${path}] does not exist`);
}

function main() {
  try {
    checkArgs();

    const customers = loadFile(args['--customers']);
    const orders = loadFile(args['--orders']);
    const products = loadFile(args['--products']);

    generateReports(customers, orders, products);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}
main();
