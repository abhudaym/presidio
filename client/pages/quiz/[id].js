import { Button, Card, Grid, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../src/components/Layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { GlobalContext } from "../../src/context/GlobalContext";

const Quiz = () => {
    const { user } = useContext(GlobalContext);
    console.log(user)
    const router = useRouter();
    const [data, setData] = useState();
    const [id, setId] = useState()
    console.log(router.query.id)
    const [score, setScore] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false)
    useEffect(() => {
        if (!router.isReady) return;
        setId(router.query.id)
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/quiz/${id}`)
            console.log(res.data)
            setData(res.data)
            res.data.enrolledUsers.map((x) => {
                console.log(toString(x.userId) === toString(user._id) && x.isComplete)
                if (toString(x.userId) === toString(user._id) && x.isComplete === true) {
                    console.log('we getting here')
                    setScore(x.score)
                    setShowScore(true)
                }
            })
        }
        if (id)
            fetchData()
    }, [router, id])
    const handleOnClick = async (correct, selected) => {
        if (correct === selected)
            setScore(score + 1);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < data.questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            // api to post score and set isCompleted to true
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const res = await axios.put(`http://localhost:5000/api/v1/quiz/${id}`, { score }, config)
            console.log(res)
        }
    }
    return (
        <Layout>
            <Container sx={{ paddingTop: '100px' }}>
                {
                    (showScore) ? (
                        <Typography variant='h4'>You Scored: {score}</Typography>
                    ) :
                        (
                            <>
                                <Typography variant='h4'>
                                    {data?.title}
                                </Typography>
                                <Typography variant='h6'>
                                    {data?.description}
                                </Typography>


                                {data?.questions.map((item, i) => {
                                    return (
                                        <Card maxW sx={{ m: "20px", p: "20px" }}>
                                            <Stack>
                                                <Typography variant='h5'>
                                                    Question {i + 1}: {item.question}
                                                </Typography>
                                                {item.options.map((x, j) => (
                                                    <Button sx={{ justifyContent: 'start', color: 'black', p: '20px', mt: '20px' }} variant='outlined' value={x} key={j} onClick={(e) => handleOnClick(e.target.value, item.answer)} >{x}
                                                    </Button>
                                                ))}
                                            </Stack>
                                        </Card>)
                                })}
                            </>
                        )
                }



            </Container>
        </Layout>
    )
}

export default Quiz