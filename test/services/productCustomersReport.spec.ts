import { expect } from 'chai';
import Order from '../../src/models/order';
import generateProductCustomersReport from '../../src/services/productCustomersReport';
import ProductCustomers from '../../src/models/productCustomers';

const orders: { [key: number]: Order } = {};

describe('ProductCustomers tests', () => {
  before(() => {
    generateCorrectTestData();
  });

  it('Generate correct report', async () => {
    const productCustomers = generateProductCustomersReport(orders);
    // console.log(productCustomers);

    assertProductCustomers(productCustomers);
  });
});

function assertProductCustomers(productCustomers: ProductCustomers[]) {
  expect(productCustomers.length).to.be.eq(2);

  console.log(productCustomers);

  expect(productCustomers[0].getId()).to.be.eq(0);
  expect(productCustomers[0].getCustomerIds().length).to.be.eq(2);
  expect(+productCustomers[0].getCustomerIds()[0]).to.eq(0);
  expect(+productCustomers[0].getCustomerIds()[1]).to.eq(2);

  expect(productCustomers[1].getId()).to.be.eq(1);
  expect(productCustomers[1].getCustomerIds().length).to.be.eq(2);
  expect(+productCustomers[1].getCustomerIds()[0]).to.be.eq(1);
  expect(+productCustomers[1].getCustomerIds()[1]).to.be.eq(2);
}

function generateCorrectTestData() {
  // Create 3 Orders
  orders[0] = new Order({ id: 0, customer: 0, products: '0 0 0 0' });
  orders[1] = new Order({ id: 1, customer: 1, products: '1 1 1 1' });
  orders[2] = new Order({ id: 2, customer: 2, products: '1 0' });
}
