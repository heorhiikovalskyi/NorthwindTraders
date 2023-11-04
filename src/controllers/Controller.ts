import { Router } from 'express';
import ValidationService from '../services/Validation';

abstract class Controller {
  path: string;
  router: Router;
  validation: ValidationService;
  constructor(path: string) {
    this.path = path;
    this.router = Router();
    this.validation = new ValidationService();
  }
}
export default Controller;
