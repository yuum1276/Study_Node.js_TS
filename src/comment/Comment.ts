import { RowDataPacket } from 'mysql2';

export interface IComment extends RowDataPacket {
  id: number;
  email: string;
  token: string;
  postId:number;
  userId: string;
  content: string;
  secret: string;
  scrtCode: string;
  parentId: number;
  createdAt: Date;
  updatedAt: Date;
}

export default IComment;
