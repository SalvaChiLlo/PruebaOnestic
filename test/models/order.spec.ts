import { expect } from 'chai';
import { assert } from 'console';
import Order from '../../src/models/order';

describe('Order tests', () => {
  it('Test Order constructor', () => {
    const { testOrder, id, customer } = createTestOrder();
    expect(testOrder.getId()).to.be.eq(id);
    expect(testOrder.getCustomerId()).to.be.eq(customer);
    expect(testOrder.getProducts()[0]).to.be.eq(1);
    expect(testOrder.getProducts()[1]).to.be.eq(2);
    expect(testOrder.getProducts()[2]).to.be.eq(3);
    expect(testOrder.getProducts()[3]).to.be.eq(4);
    expect(testOrder.getProducts()[4]).to.be.eq(5);
  });

  it('Test Order constructor wrong product format', () => {
    const id = 1;
    const customer = 2;
    const products = '1,2,3,4,5';

    try {
      const testOrder = new Order({ id, customer, products });
      assert(false, 'Constructor should fail, due to incorrect product format.');
    } catch (error: any) {
      expect(error.message).to.be.eq(`El formato de la lista de productos de la orden [${id}] es incorrecto`);
    }
  });
});

function createTestOrder() {
  const id = 1;
  const customer = 2;
  const products = '1 2 3 4 5';

  const testOrder = new Order({ id, customer, products });
  return { testOrder, id, customer };
}
