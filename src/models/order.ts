import { CSV_LIST_SEPARATOR } from '../constants/constants';

export default class Order {
  /** ID numérico que identifica el pedido */
  private id: number;

  /** ID del cliente que hizo el pedido */
  private customer: number;

  /** Listado de ID’s de productos que ha comprado un cliente en el pedido. */
  private products: number[];

  constructor(order: IOrder) {
    this.id = order.id;
    this.customer = order.customer;
    this.parseProducts(order.products);
  }

  /**
   * @summary
   * Converts a unformated list of products into a JS list of numbers
   * 0 5 0 4 5 3 2 1 1
   * ->
   * products: [0, 5, 0, 4, 5, 3, 2, 1, 1]
  */
  private parseProducts(unformattedProductList: string) {
    const regex = /^\s*(\d+\s*)+$/;
    if (!regex.test(unformattedProductList)) { throw new Error(`El formato de la lista de productos de la orden [${this.id}] es incorrecto`); }
    this.products = unformattedProductList.split(CSV_LIST_SEPARATOR).map((prod) => parseInt(prod, 10));
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getCustomerId() {
    return this.customer;
  }

  public setCustomer(customer: number) {
    this.customer = customer;
  }

  public getProducts() {
    return this.products;
  }

  public setProducts(products: number[]) {
    this.products = products;
  }
}

interface IOrder {
  id: number;
  customer: number;
  products: string;
}
