import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import Layout from "../../../src/components/Layout";
import { useRouter } from "next/router";
import { GlobalContext } from "../../../src/context/GlobalContext";
import { Button, Container, Stack, Typography } from "@mui/material";

const QuizAdminId = () => {
    const router = useRouter();
    const { user } = useContext(GlobalContext);
    const [data, setData] = useState();

    useEffect(() => {
        if (!router.isReady) return;

        const id = router.query.id;
        const fetchData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            const res = await axios.get(
                `http://localhost:5000/api/v1/admin/quiz/${id}`,
                config
            );
            setData(res.data);
            console.log(res);
        };
        fetchData();
    }, [router]);
    return (
        <Layout>
            <Container sx={{ mt: "100px" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ color: "black" }}>
                        UserId
                    </Typography>
                    <Typography variant="h6" sx={{ color: "black" }}>
                        Score
                    </Typography>
                </Stack>
                {data?.map((item) => {
                    return (
                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography variant="p" sx={{ color: "black", mt: '20px' }}>
                                {item.userId}
                            </Typography>
                            <Typography variant="p" sx={{ color: "black", mt: '20px' }}>
                                {item.score}
                            </Typography>
                        </Stack>
                    );
                })}
                <Button href='/' sx={{ justifyContent: 'center', mt: '20px' }} variant='contained' >Go Back</Button>
            </Container>
        </Layout>
    );
};

export default QuizAdminId;
