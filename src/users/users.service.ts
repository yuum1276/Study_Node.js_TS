import { RequestHandler } from 'express';
import IUser from './User';
import { pool } from '../helper/db';
import { FieldPacket } from 'mysql2/promise';
import { randomUUID } from 'crypto';
import { tokenInfo } from 'helper/token';

export const getUserList: RequestHandler = async (req, res, next) => {

  const connection = await pool.getConnection();

  const rows = await connection.query(`SELECT * FROM users`).catch((err) => {

    console.log(err);

    next(err);

  });

  console.log(rows);

  res.send(rows);

  await next();
};

export const getUser: RequestHandler = async (req, res, next) => {

  const { id } = req.params;

  const connection = await pool.getConnection();

  try {

    const [rows]: [IUser[], FieldPacket[]] = await connection.query(
      'SELECT * FROM users WHERE `id` = ?',
      [id]
    );

    console.log(rows);

    if (!rows[0]) {

      res.send('아이디가 없어용');

    } else {

      res.send(rows);
    }

  } catch (err) {

    next(err);
  }
  await next();

};

export const join: RequestHandler = async (req, res, next) => {

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
  await next();


}

export const login: RequestHandler = async (req, res, next) => {

  const data = <IUser>req.body;

  const connection = await pool.getConnection();

  const [rows]: [IUser[], FieldPacket[]] = await connection.query(
    'SELECT email FROM `users` WHERE `email` = ? AND `password` = ?',
    [data.email, data.password]
  );

  console.log(rows);

  if (rows.length > 0) {

    tokenInfo.email = data.email;

    tokenInfo.token = randomUUID();

    console.log(tokenInfo.token);

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
};

// export const logout = async (req: Request, res: Response) => {
//   res.json({ message: '로그아웃🥲' });
// };

// export const updateUser = (req: Request, res: Response) => {
//   try {
//     const params = req.params;
//     const body = req.body;
//     let result;
//     User.forEach((user: Users) => {
//       if (user.id === params.id) {
//         user = body;
//         result = user;
//       }
//     });
//     res.status(200).send({
//       success: true,
//       data: {
//         user: result,
//       },
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//     });
//   }
// };

// export const updatePart = (req: Request, res: Response) => {
//   try {
//     const params = req.params;
//     const body = req.body;
//     let result;
//     User.forEach((user: Users) => {
//       if (user.id === params.id) {
//         user = { ...user, ...body };
//         result = user;
//       }
//     });
//     res.status(200).send({
//       success: true,
//       data: {
//         user: result,
//       },
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//     });
//   }
// };

// export const aupdate = (req: Request, res: Response) => {
//   const names: Array<string | number> = [];
//   const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('This is done!');
//     }, 2000);
//   });
//   promise.then((data) => {
//     data.split(' ');
//   });
// };

// export const parted = (req: Request, res: Response) => {
//   const names: Array<string | number> = [];
//   const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('This is done!');
//     }, 2000);
//   });
//   promise.then((data) => {
//     data.split(' ');
//   });
// };

// export const deleteUser = (req: Request, res: Response) => {
//   try {
//     const params = req.params;
//     const newuser = User.filter((user: Users) => user.id !== params.id);
//     res.status(200).send({
//       success: true,
//       data: newuser,
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//     });
//   }
// };
