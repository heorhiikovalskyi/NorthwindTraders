import CustomersService from '../services/Customers';
import { Request, Response } from 'express';
import Controller from './Controller';

class CustomersController extends Controller {
  constructor(private customers: CustomersService) {
    super('/customers');
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
  }
  private getAll = async (req: Request, res: Response) => {
    const { offset: offsetStr, count: countStr } = req.query;
    const offset = Number(offsetStr);
    const count = Number(countStr);
    try {
      if (isNaN(offset) || isNaN(count) || !this.validation.pagination(offset, count)) {
        return res.sendStatus(400);
      }
      const customers = await this.customers.getAll(offset, count);
      return res.status(200).json(customers);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
  private getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (typeof id !== 'string') {
        return res.sendStatus(400);
      }
      const customer = await this.customers.getOne(id);
      return res.status(200).json(customer);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
}
export default CustomersController;
