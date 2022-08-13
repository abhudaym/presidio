import { Router } from 'express'
import { authUser, makeUserAdmin, registerUser } from '../controllers/user.js';

const router = Router();

router.post('/login', authUser);
router.post('/register', registerUser)
router.put('/createAdmin/:id', makeUserAdmin)

export default router;
