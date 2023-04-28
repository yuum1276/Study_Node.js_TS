import { RowDataPacket } from 'mysql2/promise';
export interface IPost extends RowDataPacket {
    id: number;
    title: string;
    content: string;
    token: string;
    email: string;
    secret: string;
    scrtCode: number;
    createdAt: Date;
    updatedAt: Date;
    comments: DataBoard;
}
export default IPost;
