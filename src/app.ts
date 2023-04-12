import express, { Request, Response, NextFunction } from 'express';
import postRouter from './posts/post.route'
import userRouter from './users/users.route'

const app = express();
const port = 8000;

interface Token {
  email: string;
  token: string;
}

let tokenInfo: Token = {
  email: '',
  token: '',
};

// Middleware to handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
