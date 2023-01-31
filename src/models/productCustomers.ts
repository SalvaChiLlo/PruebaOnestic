import { CSV_LIST_SEPARATOR, CSV_SEPARATOR } from '../constants/constants';

/*
* Reporte 2
*/
export default class ProductCustomers {
  /** ID del producto */
  private id: number;

  /** Lista de todos los ID's que han comprado ese producto */
  private customerIds: number[] = [];

  constructor(id: number) {
    this.id = id;
  }

  public addCustomer(customerId: number) {
    if (!this.customerExists(customerId)) {
      this.customerIds.push(customerId);
      this.customerIds.sort();
    }
  }

  private customerExists(customerId: number): boolean {
    return this.customerIds.find((customer) => customer === customerId) !== undefined;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getCustomerIds(): number[] {
    return this.customerIds;
  }

  public setCustomerIds(customerIds: number[]) {
    this.customerIds = customerIds;
  }

  private customerIdsToCsvList(): string {
    return this.customerIds.join(CSV_LIST_SEPARATOR);
  }

  public toString() {
    return `${this.id}${CSV_SEPARATOR}${this.customerIdsToCsvList()}`;
  }
}
