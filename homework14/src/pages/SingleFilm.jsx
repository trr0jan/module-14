import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { FilmContext } from "../context/FilmsContext";
import Footer from "../Components/Footer/Footer";
import SingleItemHeader from "../Components/SingleItemHeader/SingleItemHeader";
import SingleItemsTabs from "../Components/SingleItemTabs/SingleItemsTabs";


const SingleFilm = () => {
    const { filmId } = useParams();
    const { data } = useContext(FilmContext);
    const selectedFilm = data.find((el) => el.show.id === parseInt(filmId));
    console.log(data);
    return (
        <div className="singleFilm" style={{backgroundColor: '#141414'}}>
            <Grid item xs={12}>
                <SingleItemHeader />
            </Grid>
            <div style={{marginTop: '350px'}}>
                <SingleItemsTabs />
            </div>
            <div style={{marginTop: '150px'}}>
                <Footer />
            </div>
        </div>
    );
};

export default SingleFilm;