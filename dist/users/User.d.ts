import { RowDataPacket } from 'mysql2';
export interface IUser extends RowDataPacket {
    email: string;
    nick: string;
    password: string;
}
export default IUser;
