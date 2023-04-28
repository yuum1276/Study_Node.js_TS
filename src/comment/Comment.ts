import { RowDataPacket } from 'mysql2';

export interface IComment extends RowDataPacket {
  id: number;
  postId:number;
  email: string;
  nick: string;
  content: string;
  secret: string;
  scrtCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IComment;
