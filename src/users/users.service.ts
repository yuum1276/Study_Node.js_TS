import { Request, Response } from 'express';
import { User, Users } from './users.model';
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from 'uuid';

const users: Users[] = [];

export const getUserList = (req: Request, res: Response) => {
  try {
    const users = User;
    res.status(200).send({
      success: true,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

export const getUser = (req: Request, res: Response) => {
  try {
    const params = req.params;
    console.log(params);
    const user = User.find((user) => {
      return user.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, password, email } = req.body;

  const existingUser = users.find((user) => user.name === name);
  if (existingUser) {    
    return res.send("이미 사용중입니당");
  }

  const newUser: Users = {id: uuidv4(), name, password, email };
  users.push(newUser);
  console.log(newUser);

  return res.send(`환영합니당😊`);


  // try {
  //   const { name, email, password } = req.body;
  //    console.log(name);
  //    console.log(email);
  //    console.log(password);
  //   if (!name || !email || !password) {
  //    return res.status(400).send("이름, 이메일, 비밀번호를 입력해주세용");
  //   }

  //   const existingUser = users.find((user) => user.name === name);
  //   if (existingUser) {    
  //     res.send("이미 사용중입니당");
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const newUser: Users = { id: uuidv4(), name, email, password: hashedPassword };
  //   users.push(newUser);
  //   console.log(users);
    
  //   return res.send(`${newUser}님 환영합니당😊`)
  //     // const data = req.body;
  //     // User.push(data);
  //     // res.status(200).send({
  //     //   success: true,
  //     //   data: { data },
  //   } catch (error) {
  //     return res.status(400).send({
  //     success: false,
  //   });
  // }
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("이메일과 비밀번호를 입력해주세용");
  }
  const user = User.find((user) => user.email === email);
  if (!user) {
    return res.status(401).send("이메일을 확인해주세용");
  }
  // const validPassword = await bcrypt.compare(password, user.password);
  // if (!validPassword) {
  //   return res.status(401).send("비밀번호를 확인해주세용");
  // }
  res.json({ message: "로그인 성공🙌", user });
}

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "로그아웃🥲" })};

export const updateUser = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    User.forEach((user) => {
      if (user.id === params.id) {
        user = body;
        result = user;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        user: result,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

export const updatePart = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    User.forEach((user) => {
      if (user.id === params.id) {
        user = { ...user, ...body };
        result = user;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        user: result,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const newuser = User.filter((user) => user.id !== params.id);
    res.status(200).send({
      success: true,
      data: newuser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
