import express from 'express';

import { getUserInfo, getUserInfoNoAuth, login, signUp, updateUser, deleteUser } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id/info', auth, getUserInfo);
router.get('/:id/infoNoAuth', getUserInfoNoAuth);
router.post('/login', login);
router.post('/signup', signUp);
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;