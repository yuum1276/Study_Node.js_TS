import { Router } from 'express';
import { body } from 'express-validator';
import {
  createUser,
  deleteUser,
  getUser,
  getUserList,
  login,
  logout,
  updatePart,
  updateUser,
} from './users.service';

const router = Router();

router.get('/users', getUserList);

router.get('/users/:id', getUser);

router.post(
  '/signup',
  [
    body('email').exists().isEmail(),
    body('password').exists().isLength({ min: 10, max: 20 }),
  ],
  createUser
);

router.post(
  '/login',
  [
    body('email').exists().isEmail(),
    body('password').exists().isLength({ min: 10, max: 20 }),
  ],
  login
);

router.get('/logout', logout);

router.put('/users/:id', updateUser);

router.patch('/users/:id', updatePart);

router.delete('/users/:id', deleteUser);

export default router;
