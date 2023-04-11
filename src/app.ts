import express, { Request, Response, NextFunction } from 'express';
import { FieldPacket } from 'mysql2/promise';
import { IPost } from './posts/Post';
import IUser from './users/User';
import { pool } from './helper/db';

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

// User routes
// GET /users
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

// GET /users/:id
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

// POST /users/join
app.post('/users/join', async (req: Request, res: Response, next: NextFunction) => {
  const data = <IUser>req.body;
  const connection = await pool.getConnection();

  try {
    const [rows]: [IUser[], FieldPacket[]] = await connection.query(
      'SELECT * FROM `users` WHERE `email` = ?',
      [data.email]
    );
    console.log(rows);
    
    if (rows.length > 0) {
    
      res.send({ message: '사용중인 이멜이에용' });
    } else {
      const [result] = await connection.query(
        'INSERT INTO `users` (`email`, `nick`,`password`) VALUES (?, ?, ?)',
        [data.email, data.nick, data.password]
      );
      res.send({
        message: `${data.nick} 회원가입 성공! `,
      });
    }
  } catch (err) {
    console.log(err);
    return err;
  }
});

// POST /users/login
app.post('/users/login', async (req: Request, res: Response, next: NextFunction) => {
  const data = <IUser>req.body;

  const connection = await pool.getConnection();

  const [rows]: [IUser[], FieldPacket[]] = await connection.query(
    'SELECT email FROM `users` WHERE `email` = ? AND `password` = ?',
    [data.email, data.password]
  );
  console.log(rows);

  if (rows.length > 0) {
    tokenInfo.email = data.email;
    tokenInfo.token = 'asdf';
    res.send({
      message: '로그인 성공!',
      token: tokenInfo.token,
    });
  } else {
    res.send({
      message: '로그인 실패',
    });
  }
  await next();
});

// Post routes
// GET /posts
app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  const connection = await pool.getConnection();

  try {
    const rows = await connection.query('SELECT * FROM posts');
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

// POST /posts/create
app.post(
  '/posts/create',
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
        if (tokenInfo.email === data.email) {
          if (tokenInfo.token === data.token) {
            const [result]:[IPost[], FieldPacket[]] = await connection.query(
              'INSERT INTO `posts` (`title`, `content`,`email`) VALUES (?, ?, ?)',
              [data.title, data.content, data.email]
            );
              console.log(result);
              return res.send({
                title: data.title,
                content: data.content,
                email: data.email,
                createAt: data.createdAt
              });
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

app.put('/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {

    const {id} = req.params;
    const data = <IPost>req.body;
    console.log(data);

      if (data.token === '') {
        res.send({
          message: '로그인 후 사용가능!',
        });
      }

      const connection = await pool.getConnection();

      const [rows]: [IUser[], FieldPacket[]] = await connection.query(
        'SELECT id FROM `posts` WHERE `email` = ? AND `id` = ? ',
        [data.email, id]
      ).catch(err => {
        console.log(err);
        return err
      })

      // console.log("rows" + rows[0].id);

      if (!rows[0]) {
        console.log('id' + id);
        res.send('작성된 글이 없음!') 

      } else {

        if (tokenInfo.email === data.email) {

          if (tokenInfo.token === data.token) {

            if (!data.title || !data.content) {
              return res.send('제목, 내용은 필수!');
            }

            const [result] = await connection.query(
              'UPDATE posts SET title = ?, content = ? WHERE id = ? AND email = ?',
              [data.title, data.content, id, data.email]
            )

            // if (result === null) {

            //   return res.send('작성된 글이 없음!');
            // }

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
});

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
        'SELECT * FROM `posts` WHERE `email` = ? AND `id` = ?',
        [data.email, id]
      );
      console.log(rows);

      if (!rows[0]) {
        if (tokenInfo.email === data.email) {
          if (tokenInfo.token === data.token) {
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
        'SELECT id, title, content, createdAt, updatedAt FROM posts WHERE id = ?',
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
