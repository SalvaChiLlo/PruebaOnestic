/*
* Reporte 2
*/
export default class ProductCustomers {
  /** ID del producto */
  id: number;

  /** Lista de todos los ID's que han comprado ese producto */
  customerIds: number[];

  constructor(id: number) {
    this.id = id;
  }

  public addCustomer(customerId: number) {
    if (!this.customerExists(customerId)) { this.customerIds.push(customerId); }
  }

  private customerExists(customerId: number): boolean {
    return !!this.customerIds.find((customer) => customer === customerId);
  }
}
