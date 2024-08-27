import '../App.css';
import SingleCard from '../Components/SingleCard/SingleCard';
import { useRef, useContext } from 'react';
import { Box, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FilmContext } from '../context/FilmsContext';
import Footer from '../Components/Footer/Footer';


function App() {
    const { search, setSearch, data } = useContext(FilmContext);
    const navigate = useNavigate();
    const searchRef = useRef();

    const handleCardClick = (id) => {
        navigate(`/films/${id}`);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    
    return (
        <div className="App">
            <Grid item xs={12} style={{margin: '30px 0'}}>
                <Box display={'flex'} justifyContent={'center'}>
                    <TextField
                        id="outlined-controlled"
                        label="Search"
                        value={search}
                        onChange={handleSearch}
                    />
                </Box>
            </Grid>
            <div className='SingleCard'>
                {data.map((responseShow, index) => {
                    const {score, show} = responseShow;
                    return (
                    <SingleCard
                    id={show.id}
                    title={show.name}
                    description={show.summary}
                    image={show.image?.original ?? ""}
                    status={show.status}
                    handleClick={handleCardClick}
                    />
                    )
                })}
            </div>
            <Footer />
        </div>
    );
}

export default App;