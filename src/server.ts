import 'dotenv/config';
import App from './app';
import EmployeesController from './controllers/Employees';
import SuppliersController from './controllers/Suppliers';
import CustomersController from './controllers/Customers';
import OrderDetailsController from './controllers/OrderDetails';
import OrdersController from './controllers/Orders';
import ProductsController from './controllers/Products';
import { db } from './db/db';
import { EmployeesRepository } from './repositories/Employees';
import { SuppliersRepository } from './repositories/Suppliers';
import { CustomersRepository } from './repositories/Customers';
import { OrdersRepository } from './repositories/Orders';
import { ProductsRepository } from './repositories/Products';
import { OrderDetailsRepository } from './repositories/OrderDetails';
import EmployeesService from './services/Employees';
import SuppliersService from './services/Suppliers';
import CustomersService from './services/Customers';
import OrdersService from './services/Orders';
import ProductsService from './services/Products';
import OrderDetailsService from './services/OrderDetails';

const { PORT } = process.env;

const main = async () => {
  const customersRepository = new CustomersRepository(db);
  const customersService = new CustomersService(customersRepository);
  const customersController = new CustomersController(customersService);

  const productsRepository = new ProductsRepository(db);
  const productsService = new ProductsService(productsRepository);
  const productsController = new ProductsController(productsService);

  const ordersRepository = new OrdersRepository(db);
  const ordersService = new OrdersService(ordersRepository);
  const ordersController = new OrdersController(ordersService);

  const suppliersRepository = new SuppliersRepository(db);
  const suppliersService = new SuppliersService(suppliersRepository);
  const suppliersController = new SuppliersController(suppliersService);

  const employeesRepository = new EmployeesRepository(db);
  const employeesService = new EmployeesService(employeesRepository);
  const employeesController = new EmployeesController(employeesService);

  const orderDetailsRepository = new OrderDetailsRepository(db);
  const orderDetailsService = new OrderDetailsService(orderDetailsRepository);
  const orderDetailsController = new OrderDetailsController(orderDetailsService);

  const controllers = [
    customersController,
    productsController,
    ordersController,
    suppliersController,
    employeesController,
    orderDetailsController,
  ];
  const app = new App(Number(PORT), controllers);

  app.start();
};
main();
