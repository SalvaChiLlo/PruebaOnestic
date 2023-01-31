import { expect } from 'chai';
import OrderPrice from '../../src/models/orderPrice';
import generateOrderPriceReport from '../../src/services/orderPriceReport';
import Order from '../../src/models/order';
import Product from '../../src/models/product';

const orders: { [key: number]: Order } = {};
const products: { [key: number]: Product } = {};

describe('OrderPriceReport tests', () => {
  before(() => {
    generateCorrectTestData();
  });

  it('Generate correct report', async () => {
    const orderPrices = generateOrderPriceReport(orders, products);
    assertOrderPrices(orderPrices);
  });

  it('Generate report with missing product, should fail', () => {
    delete products[0];
    try {
      generateOrderPriceReport(orders, products);
    } catch (error: any) {
      expect(error.message).to.be.eq(`El producto ${0} de la orden ${0} no existe.`);
    }
  });
});

function assertOrderPrices(orderPrices: OrderPrice[]) {
  expect(orderPrices.length).to.be.eq(3);

  expect(orderPrices[0].getId()).to.be.eq(0);
  expect(orderPrices[0].getTotal()).to.be.eq(40);

  expect(orderPrices[1].getId()).to.be.eq(1);
  expect(orderPrices[1].getTotal()).to.be.eq(80);

  expect(orderPrices[2].getId()).to.be.eq(2);
  expect(orderPrices[2].getTotal()).to.be.eq(30);
}

function generateCorrectTestData() {
  // Create 2 Products
  products[0] = new Product({ id: 0, name: 'Prod0', cost: 10 });
  products[1] = new Product({ id: 1, name: 'Prod1', cost: 20 });
  // Create 3 Orders
  orders[0] = new Order({ id: 0, customer: 0, products: '0 0 0 0' });
  orders[1] = new Order({ id: 1, customer: 0, products: '1 1 1 1' });
  orders[2] = new Order({ id: 2, customer: 0, products: '1 0' });
}
