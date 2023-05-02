import { RequestHandler } from "express";
import { pool } from "../helper/db";
import IComment from "./Comment";
import { FieldPacket } from "mysql2";
import IUser from "users/User";
import { tokenInfo } from "../helper/token";

export const getCommentList: RequestHandler = async (req, res, next) => {

    try {

        const connection = await pool.getConnection();

        let comments: IComment[] | any = [];

        const [rows]: [IComment[], FieldPacket[]] = await connection.query('SELECT * FROM comment');

        for (const row of rows) {

            if (row.secret === 'n') {

                comments.push(row)

            } else {

                comments.push({ comments: "🔒" })
            }
        }

    } catch (err) {

        next(err);

    }

    await next();

}

export const insertComment: RequestHandler = async (req, res, next) => {

//     const connection = await pool.getConnection();

//     const { postId } = req.params;
    
//     // getComments(parseInt(postId), (comments) => {
//     //     res.json(comments);
//     // });

//     const data = <IComment>req.body;

//     try {

//         const connection = await pool.getConnection();

//         let comments: IComment[] | any = [];

//         if(data.secret === 'Y') {

//             const [row]: [IComment[], FieldPacket[]] = await connection.query('INSERT INTO (`post_id`, `content`, `email`, `nick`, `secret`, `scrtCode`) VALUES (?, ?, ?, ?, ?, ?)',
//             [data.postid, data.content, data.email, data.nick, data.secret, data.scrtCode]);

//             return res.send({
//                 nick: data.nick,
//                 content: data.content,
//             });

//         } else {

//             const [row]: [IComment[], FieldPacket[]] = await connection.query('INSERT INTO (`postid`, `content`, `email`, `nick`, `secret`) VALUES (?, ?, ?, ?, ?)',
//             [data.postid, data.content, data.email, data.nick, data.secret]);

//             return res.send({
//                 nick: data.nick,
//                 content: data.content });
//         }

//     } catch (err) {

//         next(err);

//     }
}

export const  createComment:RequestHandler = async (req, res, next) => {

    const connection = await pool.getConnection();

  try {

    const data =<IComment>req.body;

    if(data.token === '') {

        res.send({
            message: '로그인 후 사용가능!'
        })
    }

    const [rows]:[IUser[], FieldPacket[]] = await connection.query(
        'SELECT email FROM `users` WHERE `email` = ?', [data.email]
    )

    if(rows.length > 0) {

        if(tokenInfo.token === data.token) {

            if(data.secret === 'Y') {

                if(!data.content){

                    return res.send({

                        message: '내용을 입력해주세용'

                    })
                }

                const [result]:[IComment[], FieldPacket[]] = await connection.query(
                    "INSERT INTO comments (post_id, user_id, content, secret) VALUES (?, ?, ?, ?)",
                    [data.post_id, data.user_id, data.content, data.secret]
                  );
              
                return res.send({ state:'🔒SECRET', post_id: data.postId, user_id: data.userId, content: data.content });

            } else {

                if(!data.content){

                    return res.send({

                        message: '내용을 입력해주세용'

                    })
                }

                const [result]:[IComment[], FieldPacket[]] = await connection.query(
                    "INSERT INTO comments (post_id, user_id, content, secret) VALUES (?, ?, ?, ?)",
                    [data.post_id, data.user_id, data.content, data.secret]
                  );
              
                return res.send({ post_id: data.postId, user_id: data.userId, content: data.content });
            }

        } else {

            return res.send({

                message: 'Token 불일치'

            })
        }
    }
    
  } catch (err) {

    console.error(err);
  
}

};

export const reComment:RequestHandler = async (req, res, next) => {

    const connection = await pool.getConnection();

    const parent_id = parseInt(req.params.parent_id);

    const data =<IComment>req.body;

    try {

        if(data.token === '') {

            res.send({

                message: '로그인 후 사용가능!',
        
              });

        }

        const [rows]: [IUser[], FieldPacket[]] = await connection.query(
            'SELECT email FROM `users` WHERE `email` = ?',
            [data.email]
          );

        if(rows.length > 0) {

            if(tokenInfo.token === data.token) {

                if(data.secret === 'Y') {

                    if(!data.content){

                        return res.send({

                            message: '내용을 입력해주세용'
            
                          });
                    }

                    const [result]:[IComment[], FieldPacket[]] = await connection.query(
                        "SELECT * FROM comments WHERE parent_id = ? ORDER BY created_at ASC",
                        [parent_id]
                      );
                  
                      const comments = result.map((row:IComment) => ({
                        id: row.id,
                        parent_id: row.parentId,
                        user_id: row.userId,
                        content: row.content,
                        created_at: row,
                        children: [],
                      }));
                  
                      const commentMap = comments.reduce((map: any, comment: any) => {
                        map[comment.id] = comment;
                        return map;
                      }, {});
                  
                      const commentTree:IComment[] = [];

                      console.log("commentTree" + commentTree);
                  
                      comments.forEach((comment: any) => {
                        if (comment.parent_id !== null) {
                          const parentComment = commentMap[comment.parent_id];
                          parentComment.children.push(comment);
                        } else {
                          commentTree.push(comment);
                        }
                      });
                  
                      res.json(commentTree); 

                }
            }
        }
     
    } catch (err) {

      console.error(err);
    
    }
};
  







