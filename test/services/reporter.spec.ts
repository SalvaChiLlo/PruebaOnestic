import { assert, expect } from 'chai';
import generateReports from '../../src/services/reporter';
import { csvTestCustomers, csvTestOrdersValido, csvTestProducts } from '../testUtils/fixtures';
import { CustomerHeader, OrderHeader, ProductHeader } from '../../src/constants/constants';
import OrderPrice from '../../src/models/orderPrice';
import ProductCustomers from '../../src/models/productCustomers';
import CustomerRanking from '../../src/models/customerRanking';

describe('Reporter tests', () => {
  it('Generate reports with incorrect data, should fail', async () => {
    let expectedMessage = `The content of the Customers file does not follow the expected format -- {${CustomerHeader}}`;
    await incorrectDataTest('', csvTestOrdersValido, csvTestProducts, expectedMessage);

    expectedMessage = `The content of the Orders file does not follow the expected format -- {${OrderHeader}}`;
    await incorrectDataTest(csvTestCustomers, '', csvTestProducts, expectedMessage);

    expectedMessage = `The content of the Products file does not follow the expected format -- {${ProductHeader}}`;
    await incorrectDataTest(csvTestCustomers, csvTestOrdersValido, '', expectedMessage);
  });

  it('Generate correct report', async () => {
    const { orderPrices, productCustomers, customersRanking } = await generateReports({ csvCustomers: csvTestCustomers, csvOrders: csvTestOrdersValido, csvProducts: csvTestProducts });
    assertOrderPrices(orderPrices);
    assertProductCustomers(productCustomers);
    assertCustomersRanking(customersRanking);
  });
});

function assertOrderPrices(orderPrices: OrderPrice[]) {
  expect(orderPrices.length).to.be.eq(3);

  expect(orderPrices[0].getId()).to.be.eq(0);
  expect(orderPrices[0].getTotal()).to.be.eq(6);

  expect(orderPrices[1].getId()).to.be.eq(1);
  expect(orderPrices[1].getTotal()).to.be.eq(4);

  expect(orderPrices[2].getId()).to.be.eq(2);
  expect(orderPrices[2].getTotal()).to.be.eq(9);
}

function assertProductCustomers(productCustomers: ProductCustomers[]) {

}

function assertCustomersRanking(customersRanking: CustomerRanking[]) {

}

async function incorrectDataTest(str1: string, str2: string, str3: string, expectedMessage: string) {
  try {
    await generateReports({ csvCustomers: str1, csvOrders: str2, csvProducts: str3 });
    assert(false, 'This call should fail due to incorrect strings passed');
  } catch (error: any) {
    expect(error.message).to.be.eq(expectedMessage);
  }
}
