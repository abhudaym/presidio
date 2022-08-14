import {
    AppBar,
    Button,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GlobalContext } from "../context/GlobalContext";
import { useTheme } from "@mui/material/styles";

const logoutHandler = async () => {
    await logout();
};


const CustomHeader = () => {
    const { user, logout, error } = useContext(GlobalContext);

    const logoutHandler = async () => {
        await logout();
    };
    return (
        <AppBar
            sx={{ bgcolor: "transparent", boxShadow: 0, padding: "20px 0 0 0" }}
        >
            <Container
                maxWidth
                sx={{
                    width: "100vw",
                    padding: "10 !important",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant='h4' sx={{ color: 'black' }}>Quizer</Typography>
                {user && (
                    <Stack direction="row" sx={{ alignItems: "center" }}>

                        <Typography
                            variant="p"
                            sx={{
                                color: "black",
                                fontFamily: "Poppins !important",
                                marginRight: "70px",
                                fontWeight: 400,
                            }}
                        >
                            {user.name}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                fontFamily: "Poppins !important",
                                fontSize: "16px",
                                fontWeight: 500,
                                marginLeft: "auto",
                                marginRight: "20px",
                                padding: "5px 30px",
                                bgcolor: "#4F65F6",
                                textTransform: "none",
                            }}
                            onClick={logoutHandler}
                        >
                            Sign Out
                        </Button>
                    </Stack>
                )}

            </Container>
            <Divider sx={{ marginTop: '20px' }} />
        </AppBar>
    );
};

export default CustomHeader;
