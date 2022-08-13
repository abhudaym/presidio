import { Router } from 'express'
import { createQuiz, enroll } from '../controllers/quiz.js';
import { adminVerify, authVerify } from '../middleware/auth.js';
const router = Router();


router.post('/quiz', authVerify, adminVerify, createQuiz)
router.post('/enroll/:id', authVerify, enroll)

export default router