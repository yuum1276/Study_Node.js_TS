import { Router } from 'express';
import {
  getUser,
  getUserList,
  join,
  login,
  logout,
} from './users.service';

// User routes
const router = Router();

// GET /users
router.get('/', getUserList);

// GET /users/:id
router.get('/:id', getUser);

// POST /users/join
router.post('/join', join);

// POST /users/login
router.post('/login', login);

// POST /users/logout
router.post('/logout', logout);

export default router;
