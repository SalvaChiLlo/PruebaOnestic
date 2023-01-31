import { expect } from 'chai';
import Product from '../../src/models/product';

describe('Product tests', () => {
  it('Test Product constructor', () => {
    const {
      testProduct, id, name, cost,
    } = createTestProduct();

    expect(testProduct.getId()).to.be.eq(id);
    expect(testProduct.getName()).to.be.eq(name);
    expect(testProduct.getCost()).to.be.eq(cost);
  });
});

function createTestProduct() {
  const id = 1;
  const name = 'Test_Product';
  const cost = 1234.4321;

  const testProduct = new Product({ id, name, cost });
  return {
    testProduct, id, name, cost,
  };
}
