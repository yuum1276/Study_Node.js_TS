import { RequestHandler } from "express";
import { pool } from "../helper/db";
import IComment from "./Comment";
import { FieldPacket } from "mysql2";
import { connect } from "http2";
import Connection from "mysql2/typings/mysql/lib/Connection";

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

    const connection = await pool.getConnection();

    const { postId } = req.params;
    getComments(parseInt(postId), null, (comments) => {
        res.json(comments);
    });

    function getComments(postId: number, parentCommentId: number | null, callback: (comments: IComment[]) => void) {
        connection.query(
            'SELECT * FROM comments WHERE post_id = ? AND parent_comment_id ' + (parentCommentId === null ? 'IS NULL' : '= ?'),
            parentCommentId === null ? [postId] : [postId, parentCommentId],
            // (error, results, fields) => {
            //     if (error) throw error;
            //     const comments = results.map((comment) => ({
            //         id: comment.id,
            //         content: comment.content,
            //         author: comment.author,
            //         children: []
            //     }));
            //     if (comments.length === 0) {
            //         callback([]);
            //         return;
            //     }
            //     let completed = 0;
            //     comments.forEach((comment, index) => {
            //         getComments(postId, comment.id, (children) => {
            //             comment.children = children;
            //             completed++;
            //             if (completed === comments.length) {
            //                 callback(comments);
            //             }
            //         });
            //     });
            // }
        )
    }

    // const data = <IComment>req.body;

    // try {

    //     const connection = await pool.getConnection();

    //     let comments: IComment[] | any = [];

    //     if(data.secret === 'Y') {

    //         const [row]: [IComment[], FieldPacket[]] = await connection.query('INSERT INTO (`postId`, `content`, `email`, `nick`, `secret`, `scrtCode`) VALUES (?, ?, ?, ?, ?, ?)',
    //         [data.postId, data.content, data.email, data.nick, data.secret, data.scrtCode]);

    //         return res.send({
    //             nick: data.nick,
    //             content: data.content,
    //         });

    //     } else {

    //         const [row]: [IComment[], FieldPacket[]] = await connection.query('INSERT INTO (`postId`, `content`, `email`, `nick`, `secret`) VALUES (?, ?, ?, ?)',
    //         [data.postId, data.content, data.email, data.nick, data.secret]);

    //         return res.send({
    //             nick: data.nick,
    //             content: data.content,});
    //     }

    // } catch (err) {

    //     next(err);

    // }

    // await next();

}








