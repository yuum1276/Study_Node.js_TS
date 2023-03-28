import * as express from 'express';
import usersRouter from './users/users.route';
import boardRouter from './board/board.route';
const mysql = require('mysql');
const { validationResult } = require('express-validator');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'node_ts',
  password: 'dbal3326@@',
  database: 'node_ts',
});

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();

    con.connect(function (err: any) {
      if (err) {
        console.log(err);
      } else {
        console.log('mysql connected.');
      }
    });

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
    this.app.use(express.urlencoded({ extended: false }));
    this.setRoute();

    // validator middleware
    this.app.use((req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    });

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
