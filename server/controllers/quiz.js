import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

const createQuiz = async (req, res, next) => {
    console.log(req.body)
    let quiz = new Quiz(req.body)
    quiz = await quiz.save()
    res.json(quiz)
}

const enroll = async (req, res, next) => {
    try {
        // Add course in user's enrolled courses
        // Add user in course's enrolled users
        console.log(req.body);
        let user = req.body.user;
        let quiz = await Quiz.findById(req.params.id);
        user = await User.findById(user);
        let obj2 = {
            userId: user._id,
            isCompleted: false
        }
        let obj1 = {
            quizId: quiz._id,
            isCompleted: false
        }
        // Put check if user already enrolled
        quiz.enrolledUsers.push(obj2)
        user.enrolledQuiz.push(obj1);
        quiz = await quiz.save();
        user = await user.save();
        console.log(user, quiz);
        return res.status(201).json({ quiz: quiz, user: user });
    } catch (error) {
        console.log(error);
    }

}

export { enroll, createQuiz }
