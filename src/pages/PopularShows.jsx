import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import SingleCard from "../Components/SingleCard/SingleCard"
import { useNavigate } from "react-router-dom";

function PopularShows({children}) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleRequest = async() => {
            const accessToken = localStorage.getItem('accessToken');
            if(!accessToken) {
                return;
            };
            const response = await axios.get(
                `https://watchit-api.onrender.com/shows/popular`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        setData(response.data);
        };
        handleRequest();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/films/${id}`);
    };

    return (
        <Grid container sx={{padding: '10px', width: 1, gap: 2}}>
            {data.map((show, index) => {
                return (
                    <Grid item sx={3} key={index}>
                        <SingleCard
                            id={show.id}
                            title={show.name}
                            description={show.summary}
                            image={show.image?.original ?? ""}
                            status={show.status}
                            handleClick={handleCardClick}
                        />
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default PopularShows;