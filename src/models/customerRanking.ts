/*
* Reporte 3
*/
export default class CustomerRanking {
  /** ID del cliente */
  id: number;

  /** Nombre del cliente */
  name: string;

  /** Apellidos del cliente */
  lastname: string;

  /** Total en euros que el cliente ha comprado en productos. */
  total: number;

  constructor(id: number, name: string, lastname: string, total: number) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.total = total;
  }
}
