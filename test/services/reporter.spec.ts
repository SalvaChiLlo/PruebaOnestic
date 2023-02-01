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
  expect(productCustomers.length).to.be.eq(3);

  expect(productCustomers[0].getId()).to.be.eq(0);
  expect(productCustomers[0].getCustomerIds().length).to.be.eq(3);
  expect(+productCustomers[0].getCustomerIds()[0]).to.eq(0);
  expect(+productCustomers[0].getCustomerIds()[1]).to.eq(1);
  expect(+productCustomers[0].getCustomerIds()[2]).to.eq(2);

  expect(productCustomers[1].getId()).to.be.eq(1);
  expect(productCustomers[1].getCustomerIds().length).to.be.eq(2);
  expect(+productCustomers[1].getCustomerIds()[0]).to.be.eq(0);
  expect(+productCustomers[1].getCustomerIds()[1]).to.be.eq(1);

  expect(productCustomers[2].getId()).to.be.eq(2);
  expect(productCustomers[2].getCustomerIds().length).to.be.eq(1);
  expect(+productCustomers[2].getCustomerIds()[0]).to.be.eq(1);
}

function assertCustomersRanking(customersRanking: CustomerRanking[]) {
  expect(customersRanking.length).to.be.eq(3);

  expect(+customersRanking[0].getId()).to.be.eq(1);
  expect(customersRanking[0].getName()).to.be.eq('FName1');
  expect(customersRanking[0].getLastname()).to.be.eq('LName1');
  expect(+customersRanking[0].getTotal()).to.be.eq(9);

  expect(+customersRanking[1].getId()).to.be.eq(0);
  expect(customersRanking[1].getName()).to.be.eq('FName0');
  expect(customersRanking[1].getLastname()).to.be.eq('LName0');
  expect(+customersRanking[1].getTotal()).to.be.eq(6);

  expect(+customersRanking[2].getId()).to.be.eq(2);
  expect(customersRanking[2].getName()).to.be.eq('FName2');
  expect(customersRanking[2].getLastname()).to.be.eq('LName2');
  expect(+customersRanking[2].getTotal()).to.be.eq(4);
}

async function incorrectDataTest(str1: string, str2: string, str3: string, expectedMessage: string) {
  try {
    await generateReports({ csvCustomers: str1, csvOrders: str2, csvProducts: str3 });
    assert(false, 'This call should fail due to incorrect strings passed');
  } catch (error: any) {
    expect(error.message).to.be.eq(expectedMessage);
  }
}
