import { Request, Response } from 'express';
import { Board } from './board.model';

export const getPostList = (req: Request, res: Response) => {
  try {
    const posts = Board;
    res.status(200).send({
      success: true,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

export const getPost = (req: Request, res: Response) => {
  try {
    const params = req.params;
    console.log(params);
    const post = Board.find((post) => {
      return post.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

export const createPost = (req: Request, res: Response) => {
  try {
    const data = req.body;
    Board.push(data);
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

export const updatePost = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result;
    Board.forEach((post) => {
      if (post.id === params.id) {
        post = body;
        result = post;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        post: result,
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
    Board.forEach((post) => {
      if (post.id === params.id) {
        post = { ...post, ...body };
        result = post;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        post: result,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

export const deletePost = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const newpost = Board.filter((post) => post.id !== params.id);
    res.status(200).send({
      success: true,
      data: newpost,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
