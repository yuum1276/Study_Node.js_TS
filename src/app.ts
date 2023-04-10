import express, { Request, Response, NextFunction } from 'express';
import mysql, {FieldPacket, RowDataPacket} from 'mysql2/promise'
import { IPost } from 'posts/Post';
import IUser from 'users/User';

const app = express();
const port = 8000;

const poolConfig = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'dbal3326@@',
  database: 'node_post'
};

interface Token {
  email: string;
  token: string;
}

let token:Token = {
  email: "",
  token: ""
};

let pool = mysql.createPool(poolConfig);

// Middleware to handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// User routes
app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const rows = await pool.query(`SELECT * FROM users`)
    console.log(rows);
    res.send(rows)
  }
  catch(err){
    console.log(err);
    next(err)
  }
    
});

app.get('/users/:id',
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
      res.send(rows)
    } catch (err) {
      next(err);
    }
  }
);

app.post('/join',
  async(req: Request, res: Response, next: NextFunction) => {
    const data = <IUser>req.body;
    const connection = await pool.getConnection();
    
    try{
      const [rows]:[IUser[], FieldPacket[]] = await connection.query('SELECT * FROM `users` WHERE `email` = ?', [data.email])
      if(rows === null){
        res.send({message:'사용중인 이멜이에용'})
      } 
      const result = await connection.query(
        'INSERT INTO `users` (`email`, `nick`,`password`) VALUES (?, ?, ?)',
        [data.email, data.nick, data.password]
      )
      res.send({
        message: `${data.nick} 회원가입 성공! `
      })
    } catch(err){
      console.log(err);
      return(err)
    }
  }
)

app.post('/login',
  async(req: Request, res: Response, next: NextFunction) => {
    const data = <IUser>req.body;

    const connection = await pool.getConnection();

    const [rows]:[IUser[], FieldPacket[]] = await connection.query('SELECT * FROM `users` WHERE `email` = ?', [data.email]);
    console.log(rows);

    if(rows.length > 0){
      token.email = data.email;
      token.token = 'asdf'
      res.send({
        message: '로그인 성공!',
        token: token.token
      })
    } else {
      res.send({
        message: '로그인 실패'
      })
    }
    await next();
  }
)

// Post routes
app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
  const connection = await pool.getConnection();

  try {
    const rows = await connection.query(
      'SELECT * FROM posts'
    );
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

app.post('/uploadPost', async (req: Request, res: Response, next:NextFunction) => {
  const data = <IPost>req.body;
  console.log(data);
  try{

  if(data.token === ""){
    res.send({
      message: "로그인 후 사용가능!"
    })
  }
  const connection = await pool.getConnection();
  const [rows]:[IUser[], FieldPacket[]] = await connection.query('SELECT * FROM `users` WHERE `email` = ?', [data.email]);
  console.log(rows);
  
  if(rows !== null){
    
    if(token.email === data.email){

      if(token.token === data.token){

        const result = await connection.query(
          'INSERT INTO `posts` (`title`, `content`,`email`, `createAt`) VALUES (?, ?, ?, ?)',
          [data.title, data.content, data.email, data.createdAt]
        )

        console.log(result);
        return res.send(result)
      } else {
        return res.send({
          message: '로그인 후 이용해주세용'
        })
      }
    } else { 
      return res.send({
        message: '로그인 후 이용해주세용'
      })
    }
  }

  } catch (err) {
    next(err);
  }
})

app.get(
  '/posts/:id',
  async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      const [rows]= await connection.query(
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
)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
