import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { FilmContext } from "../../context/FilmsContext";
import GradeIcon from '@mui/icons-material/Grade';
import useFormatRuntime from "../../hooks/useFormatRuntime";
import useFormatDate from "../../hooks/useFormatDate";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

const SingleItemHeader = () => {
    const { filmId } = useParams();
    const { data } = useContext(FilmContext);
    const selectedFilm = data.find((el) => el.show.id === parseInt(filmId));
    const formatRuntime = useFormatRuntime();
    const formatDate = useFormatDate();

    return (
        <div style={{padding: '20px'}}>
            <div style={{display: 'inline-flex', textAlign: 'left', width: '100%', float: 'left', backgroundColor: '#141414', padding: '0 10px', color: '#dedede'}}>
                <div>
                    <h2 style={{textTransform: 'uppercase'}}>{selectedFilm.show.name}</h2>
                    <p style={{color: '#BE2C25'}}>{selectedFilm.show.genres}</p>
                    <ul style={{ display: 'flex', gap: '30px', width: '250px'}}>
                        <li>{formatRuntime(selectedFilm.show.runtime)}</li>
                        <li>{formatDate(selectedFilm.show.ended)}</li>
                    </ul>
                    <ul style={{ display: 'flex', listStyleType: 'none', gap: '30px', width: '250px', color: '#D22F27'}}>
                        <li><ShareIcon style={{background: '#fff',border: '4px solid gray', borderRadius: '50%', padding: '3px'}} /></li>
                        <li><FavoriteIcon style={{background: '#fff',border: '4px solid gray', borderRadius: '50%', padding: '3px'}} /></li>
                        <li><AddIcon style={{background: '#fff',border: '4px solid gray', borderRadius: '50%' , padding: '3px'}} /></li>
                    </ul>
                </div>
                <div style={{color: '#D22F27', lineHeight: '80px', marginLeft: '20px', width: '170px', height: '100px'}}>
                    <GradeIcon />
                    <GradeIcon />
                    <GradeIcon />
                    <GradeIcon />
                    <GradeIcon />
                </div>
                <span style={{lineHeight: '70px'}}>{selectedFilm.show.rating?.average ?? "?"}</span>
                <div style={{float: 'right', width: '100%'}}>
                    <img src={selectedFilm.show.image?.medium ?? ""} style={{float: 'right', marginRight: '20px', borderRadius: '8px'}} />
                </div>
            </div>
        </div>
    );
};

export default SingleItemHeader;