
import { orders } from '../db/schema/orders';

import { Order } from '../db/schema/orders';
import { MySql2Database } from 'drizzle-orm/mysql2';

export class OrdersRepository {
  constructor(private db: MySql2Database) {}
 

  getAllQuery = (offset: number, count: number) => {
    const query = this.db.select().from(orders).limit(count).offset(offset);
    return query.toSQL();
  };

  getAll = async (offset: number, count: number): Promise<Order[]> => {
    return await this.db.select().from(orders).limit(count).offset(offset);
  };
}
