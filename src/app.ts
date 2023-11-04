import exress from 'express';
import cors from 'cors';
import Controller from './controllers/Controller';

class App {
  app: exress.Application;
  private port: number;
  private controllers: Controller[];
  constructor(port: number, controllers: Controller[]) {
    this.app = exress();
    this.port = port;
    this.controllers = controllers;
    this.initializeMiddlewares();
    this.initializeControllers();
  }
  public start() {
    try {
      this.app.listen(this.port, () => {
        console.log(`http://localhost:${this.port}/`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  private initializeControllers() {
    this.controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }
  private initializeMiddlewares() {
    this.app.use(exress.json());
    this.app.use(cors());
  }
}

export default App;
