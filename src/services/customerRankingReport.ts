import Customer from '../models/customer';
import CustomerRanking from '../models/customerRanking';
import OrderPrice from '../models/orderPrice';

export default function generateCustomerRankingReport(orderPrice: OrderPrice[], customers: { [key: number]: Customer }) {
  const customersRanking: { [key: number]: CustomerRanking } = {};

  orderPrice.forEach((item) => {
    const customer = customers[item.getCustomerId()];
    if (customer) {
      if (!customersRanking[item.getCustomerId()]) {
        customersRanking[item.getCustomerId()] = new CustomerRanking(
          customer.getId(),
          customer.getFirstname(),
          customer.getLastname(),
          item.getTotal(),
        );
      } else {
        customersRanking[item.getCustomerId()].incrementTotal(item.getTotal());
      }
      return;
    }
    throw new Error(`El cliente con id ${item.getCustomerId()} de la orden ${item.getId()} no existe.`);
  });

  return Object.values(customersRanking).sort((a, b) => b.getTotal() - a.getTotal());
}
