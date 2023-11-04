import { eq } from 'drizzle-orm';
import { suppliers } from '../db/schema/suppliers';

import { Supplier } from '../db/schema/suppliers';
import { MySql2Database } from 'drizzle-orm/mysql2';

export class SuppliersRepository {
  constructor(private db: MySql2Database) {}

  getAllQuery = (offset: number, count: number) => {
    const query = this.db.select().from(suppliers).limit(count).offset(offset);
    return query.toSQL();
  };

  getAll = async (offset: number, count: number): Promise<Supplier[]> => {
    return await this.db.select().from(suppliers).limit(count).offset(offset);
  };

  public getOneQuery = (id: number) => {
    const query = this.db.select().from(suppliers).where(eq(suppliers.id, id));
    return query.toSQL();
  };

  getOne = async (id: number): Promise<Supplier> => {
    return (await this.db.select().from(suppliers).where(eq(suppliers.id, id)))[0];
  };
}
