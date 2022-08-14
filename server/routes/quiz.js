import { Router } from 'express'
import { createQuiz, enroll, getAllQuiz, getQuizDetails, getScore, getUserEnrolledQuiz, updateScore } from '../controllers/quiz.js';
import { adminVerify, authVerify } from '../middleware/auth.js';
const router = Router();


router.post('/quiz', authVerify, adminVerify, createQuiz).get('/quiz', getAllQuiz)
router.get('/enroll/:id', authVerify, enroll)
router.get('/enrolledquiz', authVerify, getUserEnrolledQuiz)
router.get('/quiz/:id', getQuizDetails)

router.put('/quiz/:id', authVerify, updateScore)

router.get('/admin/quiz', authVerify, adminVerify, getAllQuiz)
router.get('/admin/quiz/:id', authVerify, adminVerify, getScore)

export default router