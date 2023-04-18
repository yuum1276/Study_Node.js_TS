import { RowDataPacket } from 'mysql2/promise';

export interface IPost extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  token:string;
  email:string;
  secret:string;
  postCase:string;
  scrtCode: number;
  createdAt: Date;
  updatedAt: Date;
}


export default IPost;