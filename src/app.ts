import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import postRouter from './posts/post.route'
import userRouter from './users/users.route'

const app = express();
const port = 8000;

// Middleware to handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postRouter);
app.use('/users', userRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send({
    message: 'Server Error',
    error: err,
  });
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
