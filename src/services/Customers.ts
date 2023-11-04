import { CustomersRepository } from '../repositories/Customers';
import { queryService } from './Query';

class CustomersService {
  constructor(private customers: CustomersRepository) {}
  public getAll = async (offset: number, count: number) => {
    const startTimestamp = Date.now();
    const customers = await this.customers.getAll(offset, count);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.customers.getAllQuery(offset, count);
    return {
      sql: queryService.queryToString(query),
      customers,
      time,
    };
  };

  public getOne = async (id: string) => {
    const startTimestamp = Date.now();
    const customer = await this.customers.getOne(id);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.customers.getOneQuery(id);
    return {
      sql: queryService.queryToString(query),
      customer,
      time,
    };
  };
}
export default CustomersService;
