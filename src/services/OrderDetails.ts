import { OrderDetailsRepository } from '../repositories/OrderDetails';
import { queryService } from './Query';

class OrderDetailsService {
  constructor(private orderDetails: OrderDetailsRepository) {}
  public getByOrder = async (orderId: number) => {
    const startTimestamp = Date.now();
    const orderDetails = await this.orderDetails.getByOrder(orderId);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.orderDetails.getByOrderQuery(orderId);
    return {
      sql: queryService.queryToString(query),
      orderDetails,
      time,
    };
  };
}
export default OrderDetailsService;
