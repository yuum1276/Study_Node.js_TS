import { RequestHandler } from "express";
import { pool } from "helper/db";
import IComment from "./Comment";
import { FieldPacket } from "mysql2";

export const getCommentList: RequestHandler = async(req, res, next) => {

    try {
        
        const connection = await pool.getConnection();

        let comments: IComment[] | any = [];

        const [rows]: [IComment[], FieldPacket[]] = await connection.query('SELECT * FROM comment');

        for(const row of rows) {

            if(row.secret === 'n'){

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

export const insertComment: RequestHandler = async(req, res, next) => {

    const data = <IComment>req.body;

    try {
        
        const connection = await pool.getConnection();

        let comments: IComment[] | any = [];

        if(data.secret === 'Y') {

            const [row]: [IComment[], FieldPacket[]] = await connection.query('INSERT INTO (`postId`, `email`, `nick`, `secret`, `scrtCode`) VALUES (?, ?, ?, ?, ?)',
            [data.postId, data.email, data.nick, data.secret, data.scrtCode]);

            return res.send({});

        } else {

            const [row]: [IComment[], FieldPacket[]] = await connection.query('INSERT INTO (`postId`, `email`, `nick`, `secret`) VALUES (?, ?, ?, ?)',
            [data.postId, data.email, data.nick, data.secret]);

            return res.send({});

        }

    } catch (err) {

        next(err);

    }

    await next();

}







