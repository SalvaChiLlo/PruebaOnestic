export default class Customer {
  /** @summary ID numérico que identifica al cliente */
  private id: number;

  /** @summary Nombre */
  private firstname: string;

  /** @summary Apellido */
  private lastname: string;

  constructor(customer: ICustomer) {
    this.id = customer.id;
    this.firstname = customer.firstname;
    this.lastname = customer.lastname;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getFirstname() {
    return this.firstname;
  }

  public setFirstname(firstname: string) {
    this.firstname = firstname;
  }

  public getLastname() {
    return this.lastname;
  }

  public setLastname(lastname: string) {
    this.lastname = lastname;
  }
}

interface ICustomer {
  id: number;
  firstname: string;
  lastname: string;
}
