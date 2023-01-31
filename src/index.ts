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

async function main() {
  try {
    checkArgs();

    const csvCustomers = loadFile(args['--customers']);
    const csvOrders = loadFile(args['--orders']);
    const csvProducts = loadFile(args['--products']);

    const { orderPrices, productCustomers, customersRanking } = await generateReports({ csvCustomers, csvOrders, csvProducts });
    console.log({ orderPrices, productCustomers, customersRanking });
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}
main();

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
