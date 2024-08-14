import React from "react";
import { Grid } from "@mui/material";
import NavMenu from "../Components/NavMenu/NavMenu";
import { Outlet } from "react-router-dom";
import { FilmsProvider } from "../context/FilmsContext";

const Main = () => {
    return (
        <div className="App">
            <NavMenu />
            <FilmsProvider>
                <Grid container>
                    <Outlet />
                </Grid>
            </FilmsProvider>
        </div>
    );
};

export default Main;