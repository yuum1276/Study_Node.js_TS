import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getPostList,
  updatePart,
  updatePost,
} from './post.service';

const router = Router();

router.get('/board', getPostList);

router.get('/board/:id', getPost);

router.post('/board', createPost);

router.put('/board/:id', updatePost);

router.patch('/board/:id', updatePart);

router.delete('/board/:id', deletePost);

export default router;
