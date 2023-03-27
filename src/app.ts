import * as express from 'express';
import usersRouter from './users/users.route';
import boardRouter from './board/board.route';


class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    
    this.app = app;
  }

  private setRoute() {
    this.app.use(usersRouter);
    this.app.use(boardRouter);
  }

  private setMiddleware() {
    const app: express.Express = express();

    // logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log('this is logging middleware');
      next();
    });

    // json middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded( {extended : false } ));

    this.setRoute();

    // 404 middleware
    this.app.use((req, res, next) => {
      console.log('This is error middleware');
      res.send({ error: '404 not found error' });
    });
  }

  public listen() {
    const port: number = 8000;
    this.setMiddleware();
    this.app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
