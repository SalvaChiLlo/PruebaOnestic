/*
* Reporte 1
*/
export default class OrderPrice {
  /** ID del pedido */
  id: number;

  /** Total del pedido en euros */
  total: number;

  constructor(id: number, total: number) {
    this.id = id;
    this.total = total;
  }
}
