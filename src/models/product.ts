export default class Product {
  /** @summary ID numérico que identifica el producto */
  private id: number;

  /** @summary Nombre del producto */
  private name: string;

  /** @summary Precio del producto en euros */
  private cost: number;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.cost = product.cost;
  }

  public getId() {
    return this.id;
  }

  public setId(id:number) {
    this.id = id;
  }

  public getName() {
    return this.name;
  }

  public setName(name:string) {
    this.name = name;
  }

  public getCost() {
    return this.cost;
  }

  public setCost(cost:number) {
    this.cost = cost;
  }
}

interface IProduct {
  id: number;
  name: string;
  cost: number;
}
