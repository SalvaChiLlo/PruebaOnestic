import Order from '../models/order';
import ProductCustomers from '../models/productCustomers';

export default function generateProductCustomersReport(orders: { [key: number]: Order }) {
  const productCustomers: { [key: number]: ProductCustomers } = {};

  Object.keys(orders).forEach((orderId) => {
    const order = orders[+orderId];
    order.getProducts().forEach((product) => {
      if (!productCustomers[product]) {
        productCustomers[product] = new ProductCustomers(product);
      }
      productCustomers[product].addCustomer(order.getCustomerId());
    });
  });

  return Object.values(productCustomers).sort((a, b) => a.getId() - b.getId());
}
