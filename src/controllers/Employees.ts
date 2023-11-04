import { Request, Response } from 'express';
import EmployeesService from '../services/Employees';
import Controller from './Controller';

class EmployeesController extends Controller {
  constructor(private employees: EmployeesService) {
    super('/employees');
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
      const employees = await this.employees.getAll(offset, count);
      return res.status(200).json(employees);
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
      const employee = await this.employees.getOne(id);
      return res.status(200).json(employee);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
}
export default EmployeesController;
