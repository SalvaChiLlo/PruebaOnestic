import process from 'process';

export default class Order {
  /** ID numérico que identifica el pedido */
  id: number;

  /** ID del cliente que hizo el pedido */
  customer: number;

  /** Listado de ID’s de productos que ha comprado un cliente en el pedido. */
  products: number[];

  constructor(order: IOrder) {
    this.id = order.id;
    this.customer = order.customer;
    this.parseOrder(order.products);
  }

  /**
   * @summary
   * Converts a unformated list of products into a JS list of numbers
   * 0 5 0 4 5 3 2 1 1
   * ->
   * products: [0, 5, 0, 4, 5, 3, 2, 1, 1]
  */
  public parseOrder(unformattedProductList: string) {
    try {
      this.products = unformattedProductList.split(' ').map((prod) => +prod);
    } catch (error: any) {
      console.error(`El formato de la lista de productos del producto [${this.id}] es incorrecto`);
      process.exit(1);
    }
  }
}

export interface IOrder {
  id: number;
  customer: number;
  products: string;
}
