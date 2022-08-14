import { Button, Container, Stack, TextField } from '@mui/material'
import { GlobalContext } from "../../src/context/GlobalContext";
import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../src/components/Layout'
import Router from 'next/router';
import axios from 'axios';
const CreateQuiz = () => {
    const { user } = useContext(GlobalContext);
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [qno, setQno] = useState()
    const [ans1, setAns1] = useState()
    const [ans2, setAns2] = useState()
    const [question1, setQuestion1] = useState()
    const [question2, setQuestion2] = useState()
    const [options11, setOptions11] = useState()
    const [options12, setOptions12] = useState()
    const [options13, setOptions13] = useState()
    const [options14, setOptions14] = useState()
    const [options21, setOptions21] = useState()
    const [options22, setOptions22] = useState()
    const [options23, setOptions23] = useState()
    const [options24, setOptions24] = useState()
    useEffect(() => {
        if (!user && !user.isAdmin)
            Router.push('/')
        else {
            console.log(title)
        }
    }, [title])

    let options1 = []
    let options2 = []
    let o

    const handleSubmit = async () => {
        options1.push(options11)
        options1.push(options12)
        options1.push(options13)
        options1.push(options14)
        options2.push(options21)
        options2.push(options23)
        options2.push(options22)
        options2.push(options24)

        const obj = {
            title, description, questions: [
                {
                    question: question1,
                    options: options1,
                    answer: ans1
                },
                {
                    question: question2,
                    options: options2,
                    answer: ans2
                }
            ]
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };

        const res = await axios.post('http://localhost:5000/api/v1/quiz', obj, config)
        // if (res.statusCode === 200)
        //     Router.push('/')
        console.log(res)
    }
    return (
        <Layout>
            <Container sx={{ pt: '100px', display: 'flex', justifyContent: 'center' }}>
                <Stack sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Title for your quiz"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ width: '100%', justifyContent: 'center' }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Description for your quiz"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ width: '100%', mt: '20px' }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Number of questions"
                        value={qno}
                        onChange={(e) => setQno(e.target.value)}
                        sx={{ width: '100%', mt: '20px' }}
                    />


                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Question 1"
                        value={question1}
                        onChange={(e) => setQuestion1(e.target.value)}
                        sx={{ width: '100%', mt: '20px' }}
                    />
                    <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Option 1"
                            onChange={(e) => setOptions11(e.target.value)}
                            sx={{ width: '100%', mt: '20px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Option 2"
                            onChange={(e) => setOptions12(e.target.value)}
                            sx={{ width: '100%', m: '20px', mr: '0' }}
                        />
                    </Stack>
                    <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Option 3"
                            onChange={(e) => setOptions13(e.target.value)}
                            sx={{ width: '100%', mt: '20px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Option 4"
                            onChange={(e) => setOptions14(e.target.value)}
                            sx={{ width: '100%', m: '20px', mr: '0' }}
                        />
                    </Stack>
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Correct Answer"
                        value={ans1}
                        onChange={(e) => setAns1(e.target.value)}
                        sx={{ width: '100%', mt: '20px' }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Question 2"
                        value={question2}
                        onChange={(e) => setQuestion2(e.target.value)}
                        sx={{ width: '100%', mt: '20px' }}
                    />
                    <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Option 1"
                            onChange={(e) => setOptions21(e.target.value)}
                            sx={{ width: '100%', mt: '20px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Option 2"
                            onChange={(e) => setOptions22(e.target.value)}
                            sx={{ width: '100%', m: '20px', mr: '0' }}
                        />
                    </Stack>
                    <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Option 3"
                            onChange={(e) => setOptions23(e.target.value)}
                            sx={{ width: '100%', mt: '20px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Option 4"
                            onChange={(e) => setOptions24(e.target.value)}
                            sx={{ width: '100%', m: '20px', mr: '0' }}
                        />
                    </Stack>
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Correct Answer"
                        value={ans2}
                        onChange={(e) => setAns2(e.target.value)}
                        sx={{ width: '100%', mt: '20px' }}
                    />
                    <Button variant='contained' sx={{ mb: '20px' }} onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Container>
        </Layout>
    )
}

export default CreateQuiz