import { Router } from 'express';
import multer from 'multer';
import generateReports from '../services/reporter';
import { convertToCSV } from '../utils/utils';
import { CustomersRankingHeader, OrderPriceHeader, ProductCustomersHeader } from '../constants/constants';

const reportingRoutes = Router();

reportingRoutes.post('/generateReports', multer().any(), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const csvCustomers = files.find((file) => file.fieldname === 'customers').buffer.toString();
    const csvOrders = files.find((file) => file.fieldname === 'orders').buffer.toString();
    const csvProducts = files.find((file) => file.fieldname === 'products').buffer.toString();

    const { orderPrices, productCustomers, customersRanking } = await generateReports({ csvCustomers, csvOrders, csvProducts });

    res.status(200);
    res.send({
      orderPrices: convertToCSV(orderPrices, OrderPriceHeader),
      productCustomers: convertToCSV(productCustomers, ProductCustomersHeader),
      customersRanking: convertToCSV(customersRanking, CustomersRankingHeader),
    });
  } catch (error: any) {
    console.log(error);

    res.status(503);
    res.send(error.message);
  }
});

export default reportingRoutes;
