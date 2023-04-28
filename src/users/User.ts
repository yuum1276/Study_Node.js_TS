import { RowDataPacket } from 'mysql2';

export interface IUser extends RowDataPacket {
  id: number;
  email: string;
  nick: string;
  password: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
