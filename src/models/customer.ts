export default class Customer {
  /** @summary ID numérico que identifica al cliente */
  id: number;

  /** @summary Nombre */
  firstname: string;

  /** @summary Apellido */
  lastname: string;

  constructor(customer: ICustomer) {
    this.id = customer.id;
    this.firstname = customer.firstname;
    this.lastname = customer.lastname;
  }
}

export interface ICustomer {
  id: number;
  firstname: string;
  lastname: string;
}
