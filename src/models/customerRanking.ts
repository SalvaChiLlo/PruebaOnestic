import { CSV_SEPARATOR } from '../constants/constants';

/*
* Reporte 3
*/
export default class CustomerRanking {
  /** ID del cliente */
  private id: number;

  /** Nombre del cliente */
  private name: string;

  /** Apellidos del cliente */
  private lastname: string;

  /** Total en euros que el cliente ha comprado en productos. */
  private total: number;

  constructor(id: number, name: string, lastname: string, total: number) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.total = total;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getLastname() {
    return this.lastname;
  }

  public setLastname(lastname: string) {
    this.lastname = lastname;
  }

  public getTotal() {
    return this.total;
  }

  public setTotal(total: number) {
    this.total = total;
  }

  public incrementTotal(amount: number) {
    this.total += amount;
  }

  public toString() {
    return `${this.id}${CSV_SEPARATOR}${this.name}${CSV_SEPARATOR}${this.lastname}${CSV_SEPARATOR}${this.total}`;
  }
}
