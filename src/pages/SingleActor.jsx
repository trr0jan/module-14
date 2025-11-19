import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ActingCarousel from "../Components/ActingCarousel/ActingCarousel"
import Footer from "../Components/Footer/Footer";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import XIcon from '@mui/icons-material/X';
import ShareIcon from '@mui/icons-material/Share';

const SingleActor = () => {
    const { actorId } = useParams();
    const [actor, setActor] = useState(null);
    const [castShows, setCastShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadActor = async () => {
            try {
                // Данные актера
                const res = await axios.get(`https://api.tvmaze.com/people/${actorId}`);
                setActor(res.data);

                // Список шоу, где актер участвовал
                const creditsRes = await axios.get(`https://api.tvmaze.com/people/${actorId}/castcredits?embed=show`);
                setCastShows(creditsRes.data.map(item => item._embedded.show));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadActor();
    }, [actorId]);

    if (loading) return <div style={{ color: "white", padding: "40px", textAlign: "center" }}>Loading...</div>;
    if (!actor) return <div style={{ color: "white", padding: "40px", textAlign: "center" }}>Actor not found.</div>;

    return (
        <div style={{ color: "white", width: "100%", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "40px", padding: '50px 0 0' }}>
                {/* Левая колонка: фото + имя + биография */}
                <div style={{ flex: "1 0 0px" }}>
                    {actor.image?.medium && (
                        <img src={actor.image.medium} alt={actor.name} style={{ width: "55%", borderRadius: "1px" }} />
                    )}
                </div>

                {/* Правая колонка: Acting in */}
                <div style={{ flex: "2 0 0", maxWidth: '70%' }}>
                    <div style={{ textAlign: 'left', marginBottom: '40px' }}>
                        <h1 style={{ marginTop: "20px", textTransform: 'uppercase' }}>{actor.name}</h1>
                        {actor.bio ? (
                            <p style={{ color: "#C5C4C3" }} dangerouslySetInnerHTML={{ __html: actor.bio }} />
                        ) : (
                            <p style={{ color: "#C5C4C3" }}>No biography available.</p>
                        )}
                    </div>

                    <hr
                        style={{
                            border: 0,
                            height: "2px",
                            background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255, 255, 255, 0.3) 50%, rgba(202, 8, 8, 0))"
                        }}
                    />

                    <ActingCarousel
                        title="Acting in"
                        items={castShows}
                        onClick={(id) => navigate(`/films/${id}`)}
                        onViewAll={() => navigate("/films")}
                    />
                </div>
            </div>
            
            <div style={{ textAlign: 'left', fontWeight: '400', marginLeft: '140px' }}>
                <h2 style={{ fontSize: '32px' }}>Personal Info</h2>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <FacebookOutlinedIcon style={{ color: '#D22F27', padding: '5px' }} />
                    <XIcon style={{ color: '#D22F27', padding: '5px' }} />
                    <ShareIcon style={{ color: '#D22F27', padding: '5px' }} />
                </div>
                
                <div>
                    <p>Birthday</p>
                    <p style={{ color:'#ffffffd3' }}>{actor.birthday || "?"}</p>
                    <p>Country</p>
                    <p style={{ color:'#ffffffd3' }}>{actor.country?.name || "?"}</p>
                    <p>Gender</p>
                    <p style={{ color:'#ffffffd3' }}>{actor.gender || "?"}</p>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default SingleActor;
