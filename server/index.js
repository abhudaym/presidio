import express from 'express';
import connectDB from './services/db.js';
import dotenv from 'dotenv'
import userRoutes from './routes/user.js';
dotenv.config();

const app = express();

connectDB();

// Admin
// Create Quiz : get ID when you create a quiz


// User
// Take Quiz
// Quiz Schema

app.use(express.json())
app.use('/api/v1', userRoutes)

app.listen("5000", (req, res) => {
    console.log("Server is running")
})