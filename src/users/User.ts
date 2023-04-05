import db from '../helper/db';

interface User {
  // id: number;
  email: string;
  password: string;
}

class User {
  static async findOneByEmail(email: string): Promise<User | null> {
    const [rows] = await db.query('SELECT * FROM `user` WHERE `email` = ?', [
      email,
    ]);
    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0] as User;
      return user;
    }
    return null;
  }

  static async create(email: string, password: string): Promise<User> {
    const [result] = await db.query(
      'INSERT INTO `user` (`email`, `password`) VALUES (?, ?)',
      [email, password]
    );
    const user = {
      // id: result.id,
      email,
      password,
    };
    return user;
  }

  // static async findById(id: number): Promise<User | null> {
  //   const [rows] = await db.query('SELECT * FROM `user` WHERE `id` = ?', [id]);
  //   if (Array.isArray(rows) && rows.length > 0) {
  //     const user = rows[0] as User;
  //     return user;
  //   }
  //   return null;
  // }
}

export default User;
