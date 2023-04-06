import { RowDataPacket } from 'mysql2/promise';
export interface IPost extends RowDataPacket {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
declare class Post {
}
export default Post;
