import { eq } from 'drizzle-orm';

import { products } from '../db/schema/products';
import { OrderDetail } from '../db/schema/orderDetails';
import { orderDetails } from '../db/schema/orderDetails';
import { MySql2Database } from 'drizzle-orm/mysql2';

export class OrderDetailsRepository {
   constructor(private db: MySql2Database) {}

  getByOrderQuery = (orderId: number) => {
    const query = this.db
      .select()
      .from(orderDetails)
      .where(eq(orderDetails.orderId, orderId))
      .leftJoin(products, eq(orderDetails.productId, products.id));
    return query.toSQL();
  };

  getByOrder = async (orderId: number): Promise<OrderDetail[]> => {
    return await this.db
      .select()
      .from(orderDetails)
      .where(eq(orderDetails.orderId, orderId))
      .leftJoin(products, eq(orderDetails.productId, products.id));
  };
}
