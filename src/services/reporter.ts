import csv from 'csvtojson';
import Customer from '../models/customer';
import Order from '../models/order';
import Product from '../models/product';
import {
  CSV_SEPARATOR, CustomerHeader, OrderHeader, ProductHeader,
} from '../constants/constants';
import OrderPrice from '../models/orderPrice';
import ProductCustomers from '../models/productCustomers';
import CustomerRanking from '../models/customerRanking';
import generateOrderPriceReport from './orderPriceReport';
import generateProductCustomersReport from './productCustomersReport';
import generateCustomerRankingReport from './customerRankingReport';

const customersIndex: { [key: number]: Customer } = {};
const ordersIndex: { [key: number]: Order } = {};
const productsIndex: { [key: number]: Product } = {};

async function parseCSV(data: string) {
  return csv({ delimiter: CSV_SEPARATOR }).fromString(data);
}

export default async function generateReports(data: IData) {
  checkCsvIsCorrect(data);
  /** Se convierten los datos de los archivos CSV en objetos de las clases definidas */
  await parseData(data);
  const orderPrices: OrderPrice[] = generateOrderPriceReport(ordersIndex, productsIndex);
  const productCustomers: ProductCustomers[] = generateProductCustomersReport(customersIndex, ordersIndex);
  const customersRanking: CustomerRanking[] = generateCustomerRankingReport(customersIndex, ordersIndex, productsIndex);

  return { orderPrices, productCustomers, customersRanking };
}

async function parseData(data: IData) {
  const customers: Customer[] = (await parseCSV(data.csvCustomers)).map((item) => new Customer(item));
  const orders: Order[] = (await parseCSV(data.csvOrders)).map((item) => new Order(item));
  const products: Product[] = (await parseCSV(data.csvProducts)).map((item) => new Product(item));

  /** Se indexan productos, ordenes y clientes
   * para poder mejorar el rendimiento de las búsquedas */
  indexCustomers(customers);
  indexOrders(orders);
  indexProducts(products);
}

function indexCustomers(customers: Customer[]) {
  customers.forEach((item) => {
    customersIndex[item.getId()] = item;
  });
}

function indexOrders(orders: Order[]) {
  orders.forEach((item) => {
    ordersIndex[item.getId()] = item;
  });
}

function indexProducts(products: Product[]) {
  products.forEach((item) => {
    productsIndex[item.getId()] = item;
  });
}
function checkCsvIsCorrect(data: IData) {
  if (!data.csvCustomers.startsWith(CustomerHeader)) {
    throw new Error(`The content of the Customers file does not follow the expected format -- {${CustomerHeader}}`);
  }
  if (!data.csvOrders.startsWith(OrderHeader)) {
    throw new Error(`The content of the Orders file does not follow the expected format -- {${OrderHeader}}`);
  }
  if (!data.csvProducts.startsWith(ProductHeader)) {
    throw new Error(`The content of the Products file does not follow the expected format -- {${ProductHeader}}`);
  }
}

interface IData {
  csvCustomers: string,
  csvOrders: string,
  csvProducts: string,
}
