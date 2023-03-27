import { Request, Response } from 'express';
export declare const getUserList: (req: Request, res: Response) => void;
export declare const getUser: (req: Request, res: Response) => void;
export declare const createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const logout: (req: Request, res: Response) => Promise<void>;
export declare const updateUser: (req: Request, res: Response) => void;
export declare const updatePart: (req: Request, res: Response) => void;
export declare const deleteUser: (req: Request, res: Response) => void;
