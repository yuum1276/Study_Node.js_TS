import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUserList,
  updatePart,
  updateUser,
} from './users.service';

const router = Router();

router.get('/users', getUserList);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.put('/users/:id', updateUser);

router.patch('/users/:id', updatePart);

router.delete('/users/:id', deleteUser);

export default router;
