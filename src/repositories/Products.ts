import { sql, eq } from 'drizzle-orm';
import { products } from '../db/schema/products';

import { Product } from '../db/schema/products';

import { MySql2Database } from 'drizzle-orm/mysql2';

export class ProductsRepository {
   constructor(private db: MySql2Database) {}
 

  getAllQuery = (offset: number, count: number) => {
    const query = this.db.select().from(products).limit(count).offset(offset);
    return query.toSQL();
  };

  getAll = async (offset: number, count: number): Promise<Product[]> => {
    return await this.db.select().from(products).limit(count).offset(offset);
  };

  getByNameQuery = (name: string) => {
    const query = this.db
      .select()
      .from(products)
      .where(sql`lower(productName) like '${sql.raw(name.toLowerCase())}%'`);
    return query.toSQL();
  };

  getByName = async (name: string): Promise<Product[]> => {
    return await this.db
      .select()
      .from(products)
      .where(sql`lower(productName) like '${sql.raw(name.toLowerCase())}%'`);
  };

  getOne = async (id: number): Promise<Product> => {
    return (await this.db.select().from(products).where(eq(products.id, id)))[0];
  };

  getOneQuery = (id: number) => {
    const query = this.db.select().from(products).where(eq(products.id, id));
    return query.toSQL();
  };
}
