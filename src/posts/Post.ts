import { RowDataPacket, FieldPacket } from 'mysql2/promise';

export interface IPost extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  token:string;
  email:string;
  createdAt: Date;
  updatedAt: Date;
}

class Post {
  // static async create(title: string, content: string): Promise<Post> {
  //     const [result] = await db.query('INSERT INTO `post` (`title`, `content`) VALUES (?, ?)', [title, content]);
  //     const [rows]:[IPost[], FieldPacket[]] = await db.query('SELECT * FROM `post` WHERE `id` = ?', [result.id]);
  //     const post = rows[0] as Post;
  //     return post;
  // }
  // static async findAll(): Promise<Post[]> {
  //     const [rows] = //await db.query()
  //     return rows;
  // }
}

export default Post;