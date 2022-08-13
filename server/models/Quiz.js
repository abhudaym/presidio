import mongoose from 'mongoose'

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        {
            type: String,
            required: true
        }
    ],
    answer: {
        type: String,
        required: true
    },
})

const QuizSchema = mongoose.Schema(
    {
        questions: [questionSchema],
        enrolledUsers: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                isCompleted: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                score: {
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        ]
    }
)

const Quiz = mongoose.model("Quiz", QuizSchema)
export default Quiz