import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getPostList,
  updatePost,
} from './post.service';

// Post routes
const router = Router();

// GET /posts
router.get('/', getPostList);

// GET /posts/:id
router.get('/:id', getPost);

// POST /posts/create
router.post('/create', createPost);

// PUT /posts/:id
router.put('/posts/:id', updatePost);

// DELETE /posts/:id
router.delete('/:id', deletePost);

export default router;
