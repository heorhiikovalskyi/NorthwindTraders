import { ProductsRepository } from '../repositories/Products';
import { queryService } from './Query';

class ProductsService {
  constructor(private products: ProductsRepository) {}
  public getAll = async (offset: number, count: number) => {
    const startTimestamp = Date.now();
    const products = await this.products.getAll(offset, count);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.products.getAllQuery(offset, count);
    return {
      sql: queryService.queryToString(query),
      products,
      time,
    };
  };

  public getOne = async (id: number) => {
    const startTimestamp = Date.now();
    const product = await this.products.getOne(id);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.products.getOneQuery(id);
    return {
      sql: queryService.queryToString(query),
      product,
      time,
    };
  };

  public getByName = async (name: string) => {
    const startTimestamp = Date.now();
    const products = await this.products.getByName(name);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.products.getByNameQuery(name);
    return {
      sql: queryService.queryToString(query),
      products,
      time,
    };
  };
}
export default ProductsService;
