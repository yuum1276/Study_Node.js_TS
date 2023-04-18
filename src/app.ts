import express, { ErrorRequestHandler } from 'express';
import postRouter from './posts/post.route'
import userRouter from './users/users.route'

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRouter() {
    this.app.use('/posts', postRouter);
    this.app.use('/users', userRouter);
  }

  private setMiddleware() {

    // logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log('this is logging middleware');
      next();
    });

    // json middlware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.setRouter();

    // 404 middleware
    this.app.use((req, res, next) => {
      console.log('This is error middleware');
      return res.send({ error: '404 not found error' });
    });

    // error middlware
  //   const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //     res.status(500).send({
  //      message: 'Server Error',
  //      error: err,
  //    });
  //  };
   
  //  this.app.use(errorHandler);
  }

  public listen() {
    const port: number = 8000;
    this.setMiddleware();
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen()
}

init();