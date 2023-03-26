import { Request, Response } from 'express';
import { User } from './users.model';

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

export const createUser = (req: Request, res: Response) => {
  try {
    const data = req.body;
    User.push(data);
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

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
