import { Request, Response } from 'express';
import OrdersService from '../services/Orders';
import Controller from './Controller';

class OrdersController extends Controller {
  constructor(private orders: OrdersService) {
    super('/orders');
    this.router.get('/', this.getAll);
  }
  private getAll = async (req: Request, res: Response) => {
    const { offset: offsetStr, count: countStr } = req.query;
    const offset = Number(offsetStr);
    const count = Number(countStr);
    try {
      if (isNaN(offset) || isNaN(count) || !this.validation.pagination(offset, count)) {
        return res.sendStatus(400);
      }
      const orders = await this.orders.getAll(offset, count);
      return res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
}
export default OrdersController;
