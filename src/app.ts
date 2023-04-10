import express, { Request, Response, NextFunction } from 'express';
import { FieldPacket } from 'mysql2/promise';
import { IPost } from 'posts/Post';
import IUser from 'users/User';
import { pool } from './helper/db';

const app = express();
const port = 8000;

interface Token {
  email: string;
  token: string;
}

let token: Token = {
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

// User routes
app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query(`SELECT * FROM users`);
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get(
  '/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE `id` = ?',
        [id]
      );
      console.log(rows);

      if (rows === null) {
        res.send('아이디가 없어용');
      }
      res.send(rows);
    } catch (err) {
      next(err);
    }
  }
);

app.post('/join', async (req: Request, res: Response, next: NextFunction) => {
  const data = <IUser>req.body;
  const connection = await pool.getConnection();

  try {
    const [rows]: [IUser[], FieldPacket[]] = await connection.query(
      'SELECT * FROM `users` WHERE `email` = ?',
      [data.email]
    );
    if (rows === null) {
      res.send({ message: '사용중인 이멜이에용' });
    }
    const result = await connection.query(
      'INSERT INTO `users` (`email`, `nick`,`password`) VALUES (?, ?, ?)',
      [data.email, data.nick, data.password]
    );
    res.send({
      message: `${data.nick} 회원가입 성공! `,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
});

app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const data = <IUser>req.body;

  const connection = await pool.getConnection();

  const [rows]: [IUser[], FieldPacket[]] = await connection.query(
    'SELECT * FROM `users` WHERE `email` = ?',
    [data.email]
  );
  console.log(rows);

  if (rows.length > 0) {
    token.email = data.email;
    token.token = 'asdf';
    res.send({
      message: '로그인 성공!',
      token: token.token,
    });
  } else {
    res.send({
      message: '로그인 실패',
    });
  }
  await next();
});

// Post routes
app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  const connection = await pool.getConnection();

  try {
    const rows = await connection.query('SELECT * FROM posts');
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

app.post(
  '/createPost',
  async (req: Request, res: Response, next: NextFunction) => {
    const data = <IPost>req.body;
    console.log(data);
    try {
      if (data.token === '') {
        res.send({
          message: '로그인 후 사용가능!',
        });
      }
      const connection = await pool.getConnection();
      const [rows]: [IUser[], FieldPacket[]] = await connection.query(
        'SELECT * FROM `users` WHERE `email` = ?',
        [data.email]
      );
      console.log(rows);

      if (rows !== null) {
        if (token.email === data.email) {
          if (token.token === data.token) {
            const [result]: [IPost[], FieldPacket[]] = await connection.query(
              'INSERT INTO `posts` (`title`, `content`,`email`) VALUES (?, ?, ?)',
              [data.title, data.content, data.email]
            );

            console.log(result[0]);
            return res.send(result[0]);
          } else {
            return res.send({
              message: '로그인 후 이용해주세용',
            });
          }
        } else {
          return res.send({
            message: '로그인 후 이용해주세용',
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

app.put(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = <IPost>req.body;
    console.log(data);
    try {
      if (data.token === '') {
        res.send({
          message: '로그인 후 사용가능!',
        });
      }
      const connection = await pool.getConnection();
      const [rows]: [IUser[], FieldPacket[]] = await connection.query(
        'SELECT * FROM `users` WHERE `email` = ?',
        [data.email]
      );
      console.log(rows);

      if (rows !== null) {
        if (token.email === data.email) {
          if (token.token === data.token) {
            if (!data.title || !data.content) {
              return res.send('제목, 내용은 필수!');
            }

            const [result] = await connection.query(
              'UPDATE posts SET title = ?, content = ? WHERE id = ?',
              [data.title, data.content, id]
            );

            if (result === null) {
              return res.status(404).send('작성된 글이 없음!');
            }

            res.send('수정 완료!');
          } else {
            return res.send({
              message: '로그인 후 사용가능!',
            });
          }
        } else {
          return res.send({
            message: '로그인 후 사용가능!',
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = <IPost>req.body;
    console.log(data);
    try {
      if (data.token === '') {
        res.send({
          message: '로그인 후 사용가능!',
        });
      }
      const connection = await pool.getConnection();
      const [rows]: [IUser[], FieldPacket[]] = await connection.query(
        'SELECT * FROM `users` WHERE `email` = ?',
        [data.email]
      );
      console.log(rows);

      if (rows !== null) {
        if (token.email === data.email) {
          if (token.token === data.token) {
            const [result] = await connection.query(
              'DELETE FROM posts WHERE id = ?',
              [id]
            );
            if (result === null) {
              return res.send('작성된 글이 없음!');
            }
            res.send('삭제 성공!');
          } else {
            return res.send({
              message: '로그인 후 사용가능!',
            });
          }
        } else {
          return res.send({
            message: '로그인 후 사용가능!',
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      const [rows] = await connection.query(
        'SELECT id, title, content, created_at, updated_at FROM posts WHERE id = ?',
        [id]
      );
      if (rows === null) {
        res.send('작성된 글이 없어용');
      }
      res.send(rows);
    } catch (err) {
      next(err);
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
