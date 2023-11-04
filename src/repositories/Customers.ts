import { eq } from 'drizzle-orm';
import { customers } from '../db/schema/customers';

import { MySql2Database } from 'drizzle-orm/mysql2';
import { Customer } from '../db/schema/customers';

export class CustomersRepository {
  constructor(private db: MySql2Database) {}

  public getAllQuery = (offset: number, count: number) => {
    const query = this.db.select().from(customers).limit(count).offset(offset);
    return query.toSQL();
  };

  public getOneQuery = (id: string) => {
    const query = this.db.select().from(customers).where(eq(customers.id, id));
    return query.toSQL();
  };

  getAll = async (offset: number, count: number): Promise<Customer[]> => {
    return await this.db.select().from(customers).limit(count).offset(offset);
  };

  getOne = async (id: string): Promise<Customer> => {
    return (await this.db.select().from(customers).where(eq(customers.id, id)))[0];
  };
}
