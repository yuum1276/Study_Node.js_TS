// import express, { Request, Response, NextFunction } from 'express';
// import dbConnection from 'helper/db';

// const app = express();
// const port = 3000;


// // Middleware to handle errors
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))

// // User routes
// app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
//   try{
//     const rows = await conn.query(`SELECT * FROM users`)
//     console.log(rows);
//     res.send(rows)
//   }
//   catch(err){
//     console.log(err);
//     next(err)
//   }
    
// });

// app.get('/users/:id',
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { email } = req.params;
//     try {
//       const rows = await conn.query(
//         'SELECT email FROM users WHERE `email` = ?',
//         [email]
//       );
//       if (rows === null) {
//         return res.status(404).send('User not found');
//       }
//       res.send(rows);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// app.post('/signup',
//   async(req: Request, res: Response, next: NextFunction) => {
//     try{
//       const { email, password } = req.params;
//       const result = await conn.query(
//         'INSERT INTO `users` (`email`, `password`) VALUES (?, ?)',
//         [email, password]
//       )
//       const user = {
//         email, password
//       };
//       return user;
//     } catch(err){
//       console.log(err);
//       return(err)
//     }
//   }
// )

// app.post('/login',
//   async(req: Request, res: Response, next: NextFunction) => {
//     const {email, password} = req.params;
//     const rows = await conn.query('SELECT * FROM `users` WHERE `email` = ?', [email]);
    
//   }
// )

// // Post routes
// app.get('/posts', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const rows = await conn.query(
//       'SELECT id, title, content, created_at, updated_at FROM posts'
//     );
//     res.send(rows);
//   } catch (err) {
//     next(err);
//   }
// });

// app.get(
//   '/posts/:id',
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     try {
//       const rows= await conn.query(
//         'SELECT id, title, content, created_at, updated_at FROM posts WHERE id = ?',
//         [id]
//       );
//       if (rows === null) {
//         return res.status(404).send('Post not found');
//       }
//       res.send(rows);
//     } catch (err) {
//       next(err);
//     }
//   }
// )

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
