import { Router } from 'express';
import { getCommentList, insertComment } from './comment.service';

// User routes
const router = Router();

// GET /comments
router.get('/', getCommentList);

// GET /comments/:id
router.get('/:id', insertComment);

export default router;
