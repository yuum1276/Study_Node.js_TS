import db from '../helper/db';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

class Post {
  // static async create(title: string, content: string): Promise<Post> {
  //     const [result] = await db.query('INSERT INTO `post` (`title`, `content`) VALUES (?, ?)', [title, content]);
  //     const [rows] = await db.query('SELECT * FROM `post` WHERE `id` = ?', [result.insertId]);
  //     const post = rows[0] as Post;
  //     return post;
  // }
  // static async findAll(): Promise<Post[]> {
  //     const [rows] = await db.query()
  // }
}
