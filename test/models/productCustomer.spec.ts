import { expect } from 'chai';
import ProductCustomers from '../../src/models/productCustomers';

describe('ProductCustomer tests', () => {
  it('Test ProductCustomer constructor', () => {
    const { testProductCustomer, id } = createProductCustomer();

    expect(testProductCustomer.getId()).to.be.eq(id);
    expect(testProductCustomer.getCustomerIds()[0]).to.be.eq(1);
    expect(testProductCustomer.getCustomerIds()[1]).to.be.eq(2);
    expect(testProductCustomer.getCustomerIds()[2]).to.be.eq(3);
    expect(testProductCustomer.getCustomerIds()[3]).to.be.eq(4);
  });

  it('Test ToString', () => {
    const { testProductCustomer, id } = createProductCustomer();

    expect(testProductCustomer.toString()).to.be.eq(`${id},1 2 3 4`);
  });
});
function createProductCustomer() {
  const id = 1;
  const testProductCustomer = new ProductCustomers(id);
  testProductCustomer.addCustomer(1);
  testProductCustomer.addCustomer(2);
  testProductCustomer.addCustomer(3);
  testProductCustomer.addCustomer(4);
  return { testProductCustomer, id };
}
