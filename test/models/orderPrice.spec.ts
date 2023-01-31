import { expect } from 'chai';
import OrderPrice from '../../src/models/orderPrice';

describe('OrderPrice tests', () => {
  it('Test OrderPrice constructor', () => {
    const { testOrderPrice, id, total } = createOrderPrice();

    expect(testOrderPrice.getId()).to.be.eq(id);
    expect(testOrderPrice.getTotal()).to.be.eq(total);
  });

  it('Test ToString', () => {
    const { testOrderPrice, id, total } = createOrderPrice();

    expect(testOrderPrice.toString()).to.be.eq(`${id},${total}`);
  });
});
function createOrderPrice() {
  const id = 1;
  const total = 9999.99;
  const testOrderPrice = new OrderPrice(id, total, -1);
  return { testOrderPrice, id, total };
}
