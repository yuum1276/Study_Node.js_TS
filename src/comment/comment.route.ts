import { Router } from 'express';
import { createComment, getCommentList, insertComment, reComment } from './comment.service';

// User routes
const router = Router();

// GET /comments
router.get('/', getCommentList);

// POST /comments
router.post('/', createComment);

// // POST /comments/:id
// router.post('/:id', insertComment);

// GET /commnets/:parent_id
router.get('/:parent_id', reComment)


export default router;

