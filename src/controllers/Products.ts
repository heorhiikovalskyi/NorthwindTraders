import { Request, Response } from 'express';
import ProductsService from '../services/Products';
import Controller from './Controller';

class ProductsController extends Controller {
  constructor(private products: ProductsService) {
    super('/products');
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
  }
  private getAll = async (req: Request, res: Response) => {
    const { offset: offsetStr, count: countStr } = req.query;
    const offset = Number(offsetStr);
    const count = Number(countStr);
    try {
      if (isNaN(offset) || isNaN(count) || !this.validation.pagination(offset, count)) {
        return res.sendStatus(400);
      }
      const products = await this.products.getAll(offset, count);
      return res.status(200).json(products);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };

  private getOne = async (req: Request, res: Response) => {
    const { id: idStr } = req.params;
    const id = Number(idStr);
    try {
      if (isNaN(id)) {
        return res.sendStatus(400);
      }
      const product = await this.products.getOne(id);
      return res.status(200).json(product);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
}
export default ProductsController;
