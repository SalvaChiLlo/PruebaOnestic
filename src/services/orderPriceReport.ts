import Order from '../models/order';
import OrderPrice from '../models/orderPrice';
import Product from '../models/product';

export default function generateOrderPriceReport(
  orders: { [key: number]: Order },
  products: { [key: number]: Product },
) {
  const orderPrice: OrderPrice[] = [];
  Object.keys(orders).forEach((orderId) => {
    const order = orders[+orderId];
    let total = 0;
    if (order) {
      // Realizar la reducción/acumulación de los precios de cada producto en el pedido
      total = order.getProducts().reduce(
        (accumulator: number, currentValue: number) => {
          if (products[currentValue]) {
            // El segundo + es para realizar la conversión a number,
            // por algun motivo el valore se convierte a string a pesar de
            // devolver un number
            return accumulator + +products[currentValue].getCost();
          }
          throw new Error(`El producto ${currentValue} de la orden ${orderId} no existe.`);
        },
        total,
      );

      orderPrice.push(new OrderPrice(+orderId, total, order.getCustomerId()));
    }
  });

  return orderPrice.sort((a, b) => a.getId() - b.getId());
}
