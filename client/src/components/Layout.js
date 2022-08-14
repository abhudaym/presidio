import React from "react";
import CustomHeader from "./CustomHeader";
import { styled } from "@mui/material/styles";

const StyledDiv = styled("div")(() => ({
    position: "relative",
}));

const Layout = ({ children }) => {
    return (
        <>
            <StyledDiv>
                <CustomHeader />

                {children}
            </StyledDiv>
        </>
    );
};

export default Layout;
