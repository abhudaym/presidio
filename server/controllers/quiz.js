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
        let user = req.user;
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
        return res.status(201).json({ quiz: quiz, user: user });
    } catch (error) {
        console.log(error);
    }

}


const getAllQuiz = async (req, res, next) => {
    const quiz = await Quiz.find()
    console.log(quiz)
    res.json(quiz)
}

const getUserEnrolledQuiz = async (req, res, next) => {
    const user = req.user;
    res.json(user.enrolledQuiz)
}

const getQuizDetails = async (req, res, next) => {
    let quiz = req.params.id
    quiz = await Quiz.findById(quiz)

    res.json(quiz);
}

const updateScore = async (req, res) => {
    let quiz = req.params.id
    let user = req.user
    const { score } = req.body

    quiz = await Quiz.findById(quiz)
    user = await User.findById(user)
    quiz.enrolledUsers.map((x) => {
        if (toString(x.userId) == toString(user._id)) {
            x.isComplete = true;
            x.score = score
        }
    })

    user.enrolledQuiz.map((x) => {
        console.log(toString(x.quizId) === toString(quiz._id))
        if (toString(x.quizId) === toString(quiz._id)) {
            console.log('second')
            x.isComplete = true
            x.score = score
        }
    })
    quiz = await quiz.save();
    user = await user.save();


    res.json({ user, quiz });
}



export { enroll, createQuiz, getAllQuiz, getUserEnrolledQuiz, getQuizDetails, updateScore }
