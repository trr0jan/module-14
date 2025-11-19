import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
    return (
        <Grid sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Outlet />
        </Grid>
    );
};

export default Auth;