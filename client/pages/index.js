import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GlobalContext } from "../src/context/GlobalContext";
import { useContext, useEffect, useState } from 'react';
import Layout from '../src/components/Layout';
import { Button, Card, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import Router from 'next/router';
import axios from 'axios'
const RootStyle = styled("div")(({ theme }) => ({
  fontFamily: "Poppins !important",
  display: "flex",
  overflow: "hidden",
  height: "100vh",
  alignItems: "space-around",
  justifyContent: "center",
  paddingTop: '100px'
}));

export default function Home() {
  const { user, logout } = useContext(GlobalContext);
  const [quiz, setQuiz] = useState();
  useEffect(() => {
    if (!user)
      Router.push('/auth/login')
    else {
      const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/api/v1/quiz')
        setQuiz(res.data);
        console.log(res.data)
      }
      fetchData()
    }
  }, [])

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  };
  const handleOnClick = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/v1/enroll/${id}`, config)
    console.log(res)
    Router.push(`/quiz/${id}`)

  }

  return (
    <Layout>
      <RootStyle>
        <Grid container>
          {quiz && quiz.map((item) => {
            return (
              <Grid item lg={4} md={6}>
                <Card
                  sx={{ margin: "0 40px", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}
                >

                  <Container sx={{ paddingTop: "20px", paddingBottom: "20px", margin: '10px' }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Poppins !important",
                        marginBottom: "10px",
                        fontWeight: 500,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Stack direction="column">
                      <Typography variant='p'>{item.description}</Typography>
                      <Typography variant='p'>Total Questions: {item.questions.length}</Typography>
                      <Stack direction='row' sx={{ alignItems: 'center', mt: '30px', justifyContent: 'space-evenly' }}>
                        <Button variant='contained' sx={{ width: '40%' }} onClick={() => handleOnClick(item._id)}>Take quiz</Button>
                        <Typography variant='p'>
                          Total Users: {item.enrolledUsers.length}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Container>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </RootStyle>
    </Layout>

  )
}
