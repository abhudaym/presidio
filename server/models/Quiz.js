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
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        questions: [questionSchema],
        enrolledUsers: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                isComplete: {
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