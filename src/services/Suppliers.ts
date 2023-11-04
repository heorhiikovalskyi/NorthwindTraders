import { SuppliersRepository } from '../repositories/Suppliers';
import { queryService } from './Query';

class SuppliersService {
  constructor(private suppliers: SuppliersRepository) {}
  public getAll = async (offset: number, count: number) => {
    const startTimestamp = Date.now();
    const suppliers = await this.suppliers.getAll(offset, count);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.suppliers.getAllQuery(offset, count);
    return {
      sql: queryService.queryToString(query),
      suppliers,
      time,
    };
  };

  public getOne = async (id: number) => {
    const startTimestamp = Date.now();
    const supplier = await this.suppliers.getOne(id);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.suppliers.getOneQuery(id);
    return {
      sql: queryService.queryToString(query),
      supplier,
      time,
    };
  };
}
export default SuppliersService;
