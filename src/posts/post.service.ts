import { Request, Response } from 'express';
import { Post } from './post.model';

export const getPostList = (req: Request, res: Response) => {
  try {
    const posts = Post;
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
    const post = Post.find((post) => {
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
    const post = req.body;
    console.log(post);
    Post.push(post);
    res.status(200).send({
      success: true,
      data: { post },
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
    Post.forEach((post) => {
      if (post.id === params.id) {
        post = body;
        result = post;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        result,
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
    Post.forEach((post) => {
      if (post.id === params.id) {
        post = { ...post, ...body };
        result = post;
      }
    });
    res.status(200).send({
      success: true,
      data: {
        result,
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
    const newpost = Post.filter((post) => post.id !== params.id);
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
