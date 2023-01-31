import { expect } from 'chai';
import OrderPrice from '../../src/models/orderPrice';
import CustomerRanking from '../../src/models/customerRanking';
import generateCustomerRankingReport from '../../src/services/customerRankingReport';
import Customer from '../../src/models/customer';

const orderPrice: OrderPrice[] = [];
const customers: { [key: number]: Customer } = {};

describe('CustomerRanking tests', () => {
  before(() => {
    generateCorrectTestData();
  });

  it('Generate correct report', async () => {
    const customerRankings = generateCustomerRankingReport(orderPrice, customers);
    assertCustomersRanking(customerRankings);
  });

  it('Generate report with missing product, should fail', () => {
    delete customers[0];
    try {
      generateCustomerRankingReport(orderPrice, customers);
    } catch (error: any) {
      expect(error.message).to.be.eq(`El cliente con id ${0} de la orden ${1} no existe.`);
    }
  });
});

function generateCorrectTestData() {
  // Create 3 Customers
  customers[0] = new Customer({ id: 0, firstname: 'T_FName0', lastname: 'T_LName0' });
  customers[1] = new Customer({ id: 1, firstname: 'T_FName1', lastname: 'T_LName1' });
  customers[2] = new Customer({ id: 2, firstname: 'T_FName2', lastname: 'T_LName2' });

  // Create 3 OrderPrice
  orderPrice.push(new OrderPrice(0, 7, 1));
  orderPrice.push(new OrderPrice(1, 10, 0));
  orderPrice.push(new OrderPrice(2, 5, 0));
  orderPrice.push(new OrderPrice(3, 20, 2));
}

function assertCustomersRanking(customersRanking: CustomerRanking[]) {
  expect(customersRanking.length).to.be.eq(3);

  expect(+customersRanking[0].getId()).to.be.eq(2);
  expect(customersRanking[0].getName()).to.be.eq('T_FName2');
  expect(customersRanking[0].getLastname()).to.be.eq('T_LName2');
  expect(+customersRanking[0].getTotal()).to.be.eq(20);

  expect(+customersRanking[1].getId()).to.be.eq(0);
  expect(customersRanking[1].getName()).to.be.eq('T_FName0');
  expect(customersRanking[1].getLastname()).to.be.eq('T_LName0');
  expect(+customersRanking[1].getTotal()).to.be.eq(15);

  expect(+customersRanking[2].getId()).to.be.eq(1);
  expect(customersRanking[2].getName()).to.be.eq('T_FName1');
  expect(customersRanking[2].getLastname()).to.be.eq('T_LName1');
  expect(+customersRanking[2].getTotal()).to.be.eq(7);
}
