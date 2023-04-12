import { RequestHandler } from 'express';
export interface Token {
    email: string;
    token: string;
}
export declare const getUserList: RequestHandler;
export declare const getUser: RequestHandler;
export declare const join: RequestHandler;
export declare const login: RequestHandler;
