import { Request, Response } from 'express';
import SuppliersService from '../services/Suppliers';
import Controller from './Controller';

class SuppliersController extends Controller {
  constructor(private suppliers: SuppliersService) {
    super('/suppliers');
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
      const suppliers = await this.suppliers.getAll(offset, count);
      return res.status(200).json(suppliers);
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
      const supplier = await this.suppliers.getOne(id);
      return res.status(200).json(supplier);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
}
export default SuppliersController;
