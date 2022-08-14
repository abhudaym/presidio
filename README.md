# Presidio Campus Hiring - Round 3 Assignment

### Problem Statement

Create a Web based application for an online quiz.

Tech Stack:

    Front-end : Any

    Back-end : Any

    Db : Any

Types of Users:

    User

    Admin

User Use cases:

    - login

    - signup

    - Taking exams

    - checking results for the exams taken

    - logout

Admin Use Cases

    - login (for admin use separate UI)

    - Create Exams

    - view marks of every candidate

    - sort marks

    - search using candidate name

### Submission by Abhuday Mishra, RA1911003010669

### How to run:

1. clone the repository
2. `cd client && yarn`
3. ` yarn dev`
4. `cd ..`
5. `cd server && yarn`
6. ` yarn dev`

This should serve up the the FE on `localhost:3000/` and BE on `localhost:5000/`

### API routes

- User Routes
  1. POST `http://localhost:5000/api/v1/login` - For authenticating User
  2. POST `http://localhost:5000/api/v1/register` - For Registering User
  3. PUT `http://localhost:5000/api/v1/createAdmin/:id` - For updating user as Admin (This route should be only accessible to admins but is made accessible to all for now so that testers can create Admins)
- Quiz Routes
  1. GET `http://localhost:5000/api/v1/quiz` - To get all Quizzes
  2. POST `http://localhost:5000/api/v1/quiz` - To create a quiz - Only Open to Admin users
  3. GET `http://localhost:5000/api/v1/enroll/:id` - To enroll a user in a quiz
  4. GET `http://localhost:5000/api/v1/enrolledquiz` - To show a user's enrolled quizzes
  5. GET `http://localhost:5000/api/v1/quiz/:id` - To Attempt Quiz
  6. PUT `http://localhost:5000/api/v1/quiz/:id` - To update Users score
  7. GET `http://localhost:5000/api/v1/admin/quiz` - To get All Scores of all quizzes
  8. GET `http://localhost:5000/api/v1/admin/quiz/:id` - To get Quiz Specific scores

### Technologies Used

- Frontend: NextJS, Context API
- Backend: NodeJS, MongoDB

### Unhandled Errors

- There is one unhandled error: Hydration Error - it is caused when loading up user info from the localStorage. Kindly ignore the warning.
