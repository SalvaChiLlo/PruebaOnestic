import arg from 'arg';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import process from 'process';
import generateReports from './services/reporter';
import {
  CustomersRankingHeader, OrderPriceHeader, ProductCustomersHeader,
} from './constants/constants';

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

    const { orderPrices, productCustomers, customersRanking } = await launchProcess(csvCustomers, csvOrders, csvProducts);
    writeCSVFile(orderPrices, OrderPriceHeader, 'order_prices.csv');
    writeCSVFile(productCustomers, ProductCustomersHeader, 'product_customers.csv');
    writeCSVFile(customersRanking, CustomersRankingHeader, 'customer_ranking.csv');
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}
main();

function checkArgs() {
  if (args['--help']) {
    showHelpMessage();
  } else if (!(args['--customers'] && args['--orders'] && args['--products'])) {
    showHelpMessage();
  }
}

function showHelpMessage() {
  console.log(
    `
  Usage:
    --customers [file_path] | required
    --products [file_path] | required
    --orders [file_path] | required
  `,
  );
  process.exit(0);
}

function loadFile(path: string): string {
  if (existsSync(path)) {
    return readFileSync(path).toString();
  }

  throw new Error(`File [${path}] does not exist`);
}

function writeCSVFile(items: any[], header: string, filename: string) {
  let buffer = `${header}\n`;
  items.forEach((item) => { buffer += `${item}\n`; });

  writeFileSync(`./${filename}`, buffer);
}

async function launchProcess(csvCustomers: string, csvOrders: string, csvProducts: string) {
  return generateReports({ csvCustomers, csvOrders, csvProducts });
}
