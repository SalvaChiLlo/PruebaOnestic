export default class Product {
  /** @summary ID numérico que identifica el producto */
  id: number;

  /** @summary Nombre del producto */
  name: string;

  /** @summary Precio del producto en euros */
  cost: number;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.cost = product.cost;
  }
}

export interface IProduct {
  id: number;
  name: string;
  cost: number;
}
