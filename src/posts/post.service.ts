import { RequestHandler } from 'express';
import { pool } from '../helper/db';
import { IPost } from './Post';
import { FieldPacket } from 'mysql2';
import IUser from 'users/User';
import { tokenInfo } from '../helper/token';

export const getPostList: RequestHandler = async (req, res, next) => {

  const connection = await pool.getConnection();

  const rows = await connection.query('SELECT * FROM posts').catch((err) => {
    console.log(err);
    next(err);

  })

  res.send(rows);

  await next();

};

export const getPost: RequestHandler = async (req, res, next) => {

  const { id } = req.params;

  const data = req.body;

  const connection = await pool.getConnection();

  try {

    const [rows]: [IPost[], FieldPacket[]] = await connection.query(
      'SELECT id, title, content, createdAt, updatedAt FROM posts WHERE id = ?',
      [id]
    );

    if (!rows[0]) {

      res.send('작성된 글이 없어용');

    } else {

      // select scrtCode from posts  // 모든 scrtCode 컬럼을 다 가지고와서 
      // if row[0].scrtCode !== null // scrtCode 가 null이 아닌것만 가지고 옴 else {retrun rows}
      // select * from posts where scrtCode = scrtCode AND id = id 조건 일치하는지 매칭
      // 결과가 있으면 return 없으면 scrtCode 불일치
      // 로그인 안한 user도 scrtCode만 알면 볼수있음








      res.send(rows);

    }

  } catch (err) {

    next(err);
  }

  await next();

}


export const createPost: RequestHandler = async (req, res, next) => {

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
      'SELECT email FROM `users` WHERE `email` = ?',
      [data.email]
    );

    console.log(rows);

    if (rows.length > 0) {

      if (tokenInfo.email === data.email) {

        if (tokenInfo.token === data.token) {

          if (!data.scrtCode) {

            const [result]: [IPost[], FieldPacket[]] = await connection.query(
              'INSERT INTO `posts` (`title`, `content`,`email`) VALUES (?, ?, ?)',
              [data.title, data.content, data.email]
            );

            console.log(result);

            return res.send({

              title: data.title,

              content: data.content,

              email: data.email,
            });

          } else {

            const [result]: [IPost[], FieldPacket[]] = await connection.query(
              'INSERT INTO `posts` (`title`, `content`,`email`, `scrtCode`) VALUES (?, ?, ?, ?)',
              [data.title, data.content, data.email, data.scrtCode]
            );

            console.log(result);

            return res.send({

              title: data.title,

              content: data.content,

              email: data.email,
            });

          }

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

  await next();

}


export const updatePost: RequestHandler = async (req, res, next) => {

  const { id } = req.params;

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

    res.send({

      message: '작성된 글이 없음!'

    })

  } else {

    if (tokenInfo.email === data.email) {

      if (tokenInfo.token === data.token) {

        if (!data.title || !data.content) {

          return res.send({

            message: '제목, 내용은 필수!'

          });
        }

        const [result] = await connection.query(
          'UPDATE posts SET title = ?, content = ? WHERE id = ? AND email = ?',
          [data.title, data.content, id, data.email]
        )

        // if (result === null) {

        //   return res.send('작성된 글이 없음!');
        // }

        res.send({

          message: '수정 완료!'

        });

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

  await next();

};

export const deletePost: RequestHandler = async (req, res, next) => {

  const { id } = req.params;

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

    res.send({

      message: '작성된 글이 없음!'

    })

  } else {

    if (tokenInfo.email === data.email) {

      if (tokenInfo.token === data.token) {

        const [result] = await connection.query(
          'DELETE FROM posts WHERE id = ?',
          [id]
        )

        // if (result === null) {

        //   return res.send('작성된 글이 없음!');
        // }

        res.send({

          message: '삭제 완료!'

        });

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

  await next();
}

