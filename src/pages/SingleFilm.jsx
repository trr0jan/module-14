import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleItemHeader from "../Components/SingleItem/SingleItemHeader"; 
import SingleItemsTabs from "../Components/SingleItem/SingleItemsTabs";
import ActorItem from "../Components/SingleItem/ActorItem";
import Footer from "../Components/Footer/Footer"

const SingleFilm = () => {
    const { filmId } = useParams();
    const [filmData, setFilmData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [episodes, setEpisodes] = useState([]);
    const [cast, setCast] = useState([]);


    useEffect(() => {
    const loadFilm = async () => {
        try {
            const res = await axios.get(`https://api.tvmaze.com/shows/${filmId}`);
            const castRes = await axios.get(`https://api.tvmaze.com/shows/${filmId}/cast`);
            const epsRes = await axios.get(`https://api.tvmaze.com/shows/${filmId}/episodes`);

            setEpisodes(epsRes.data);
            setFilmData({ show: res.data });
            setCast(castRes.data.map(item => item.person)); 
        } catch (error) {
            console.error("Error loading film:", error);
        } finally {
            setLoading(false);
        }
    };

    loadFilm();
}, [filmId]);


    if (loading) {
        return (
            <div style={{ color: "white", padding: "40px", textAlign: "center" }}>
                Loading...
            </div>
        );
    }

    if (!filmData) {
        return (
            <div style={{ color: "white", padding: "40px", textAlign: "center" }}>
                Film not found.
            </div>
        );
    }

    return (
        <div>
            <SingleItemHeader data={filmData} />
            <SingleItemsTabs data={filmData} episodes={episodes} />

            <div style={{ padding: "40px" }}>
                <hr
                    style={{
                        border: 0,
                        height: "2px",
                        background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255, 255, 255, 0.1) 50%, rgba(202, 8, 8, 0))"
                    }}
                />


                <h2 style={{ color: "#fffffff8", margin: "40px 0 15px 20px", textAlign: 'left', fontSize: '30px' }}>Starring</h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "70px",
                    }}
                >
                    {cast.length > 0 ? (
                        cast.map((actor, index) => (
                            <ActorItem key={index} actor={actor} />
                        ))
                    ) : (
                        <div style={{ color: "#ffffffe7" }}>No actors found.</div>
                    )}
                </div>
            </div>


            <Footer />
        </div>
    );

};

export default SingleFilm;
