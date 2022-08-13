import { Router } from 'express'
import { createQuiz, enroll } from '../controllers/quiz.js';
const router = Router();


router.post('/quiz', createQuiz)
router.post('/enroll/:id', enroll)

export default router