import { Request, Response } from 'express';
import OrderDetailsService from '../services/OrderDetails';
import Controller from './Controller';

class OrderDetailsController extends Controller {
  constructor(private orderDetails: OrderDetailsService) {
    super('/orderDetails');
    this.router.get('/:orderId', this.getByOrder);
  }
  private getByOrder = async (req: Request, res: Response) => {
    const { orderId: orderIdStr } = req.params;
    const orderId = Number(orderIdStr);
    try {
      if (isNaN(orderId)) {
        return res.sendStatus(400);
      }
      const orderDetails = await this.orderDetails.getByOrder(orderId);
      return res.status(200).json(orderDetails);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
}
export default OrderDetailsController;
