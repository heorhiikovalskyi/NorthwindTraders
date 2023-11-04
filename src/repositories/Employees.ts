import {  eq } from 'drizzle-orm';
import { employees } from '../db/schema/employees';

import { Employee } from '../db/schema/employees';
import { MySql2Database } from 'drizzle-orm/mysql2';

export class EmployeesRepository {
  constructor(private db: MySql2Database) {}
 

  getAllQuery = (offset: number, count: number) => {
    const query = this.db.select().from(employees).limit(count).offset(offset);
    return query.toSQL();
  };

  getOneQuery = (id: number) => {
    const query = this.db.select().from(employees).where(eq(employees.id, id));
    return query.toSQL();
  };

  getAll = async (offset: number, count: number): Promise<Employee[]> => {
    return await this.db.select().from(employees).limit(count).offset(offset);
  };

  getOne = async (id: number): Promise<Employee> => {
    return (await this.db.select().from(employees).where(eq(employees.id, id)))[0];
  };
}
