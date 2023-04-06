import { RowDataPacket } from 'mysql2';
export interface IUser extends RowDataPacket {
    email: string;
    password: string;
}
declare class User {
}
export default User;
