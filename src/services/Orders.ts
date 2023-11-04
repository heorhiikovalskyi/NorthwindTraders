import { OrdersRepository } from '../repositories/Orders';
import { queryService } from './Query';

class OrdersService {
  constructor(private orders: OrdersRepository) {}
  public getAll = async (offset: number, count: number) => {
    const startTimestamp = Date.now();
    const orders = await this.orders.getAll(offset, count);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.orders.getAllQuery(offset, count);
    return {
      sql: queryService.queryToString(query),
      orders,
      time,
    };
  };
}
export default OrdersService;
