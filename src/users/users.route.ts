import { Router } from 'express';
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

router.post('/signup', createUser);

router.post('/login', login);

router.get('/logout', logout);

router.put('/users/:id', updateUser);

router.patch('/users/:id', updatePart);

router.delete('/users/:id', deleteUser);

export default router;


