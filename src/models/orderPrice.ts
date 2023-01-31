import { CSV_SEPARATOR } from '../constants/constants';

/*
* Reporte 1
*/
export default class OrderPrice {
  /** ID del pedido */
  private id: number;

  /** Total del pedido en euros */
  private total: number;

  constructor(id: number, total: number) {
    this.id = id;
    this.total = total;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getTotal() {
    return this.total;
  }

  public setTotal(total: number) {
    this.total = total;
  }

  public toString() {
    return `${this.id}${CSV_SEPARATOR}${this.total}`;
  }
}
