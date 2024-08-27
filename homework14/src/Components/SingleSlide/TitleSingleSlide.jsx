import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { FilmContext } from '../../context/FilmsContext';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import GradeIcon from '@mui/icons-material/Grade';

const SingleSlide = () => {
    const { filmId } = useParams();
    const { data } = useContext(FilmContext);
    const selectedFilm = data ? data.find((el) => el.show.id === parseInt(filmId)) : null;
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <h2>{show.name}</h2>
        </>
    );
};

export default SingleSlide;