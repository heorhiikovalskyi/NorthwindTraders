import { EmployeesRepository } from '../repositories/Employees';
import { queryService } from './Query';

class EmployeesService {
  constructor(private employees: EmployeesRepository) {}
  public getAll = async (offset: number, count: number) => {
    const startTimestamp = Date.now();
    const employees = await this.employees.getAll(offset, count);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.employees.getAllQuery(offset, count);
    return {
      sql: queryService.queryToString(query),
      employees,
      time,
    };
  };

  public getOne = async (id: number) => {
    const startTimestamp = Date.now();
    const employee = await this.employees.getOne(id);
    const endTimestamp = Date.now();
    const time = endTimestamp - startTimestamp;

    const query = this.employees.getOneQuery(id);
    return {
      sql: queryService.queryToString(query),
      employee,
      time,
    };
  };
}
export default EmployeesService;
