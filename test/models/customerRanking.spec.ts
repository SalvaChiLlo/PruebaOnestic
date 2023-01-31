import { expect } from 'chai';
import CustomerRanking from '../../src/models/customerRanking';

describe('CustomerRanking tests', () => {
  it('Test CustomerRanking constructor', () => {
    const {
      testCustomerRanking, id, firstname, lastname, total,
    } = createCustomerRanking();

    expect(testCustomerRanking.getId()).to.be.eq(id);
    expect(testCustomerRanking.getName()).to.be.eq(firstname);
    expect(testCustomerRanking.getLastname()).to.be.eq(lastname);
    expect(testCustomerRanking.getTotal()).to.be.eq(total);
  });

  it('Test ToString', () => {
    const {
      testCustomerRanking, id, firstname, lastname, total,
    } = createCustomerRanking();

    expect(testCustomerRanking.toString()).to.be.eq(`${id},${firstname},${lastname},${total}`);
  });
});

function createCustomerRanking() {
  const id = 1;
  const firstname = 'Test_FirstName';
  const lastname = 'Test_LastName';
  const total = 9999.99;
  const testCustomerRanking = new CustomerRanking(id, firstname, lastname, total);
  return {
    testCustomerRanking, id, firstname, lastname, total,
  };
}
