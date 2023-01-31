import { expect } from 'chai';
import Customer from '../../src/models/customer';

describe('Customer tests', () => {
  it('Test Customer constructor', () => {
    const firstname = 'Test_FirstName';
    const lastname = 'Test_LastName';
    const id = 1;

    const testCustomer = new Customer({ id, firstname, lastname });

    expect(testCustomer.getId()).to.be.eq(id);
    expect(testCustomer.getFirstname()).to.be.eq(firstname);
    expect(testCustomer.getLastname()).to.be.eq(lastname);
  });
});
