import '../App.css';
import Slider from '../Components/TitleSingleSlide/TitleSingleSlide';
import Carousel from '../Components/Carousel/Carousel';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilmContext } from '../context/FilmsContext';
import Footer from '../Components/Footer/Footer';

function Home() {
    const { search, setSearch } = useContext(FilmContext);
    const navigate = useNavigate();

    const [actionShows, setActionShows] = useState([]);
    const [crimeShows, setCrimeShows] = useState([]);

    const fetchCategory = async (category, setter) => {
        try {
            const res = await fetch(`https://api.tvmaze.com/search/shows?q=${category}`);
            const data = await res.json();
            setter(data.map(item => item.show));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategory("action", setActionShows);
        fetchCategory("crime", setCrimeShows);
    }, []);

    const handleCardClick = (id) => {
        navigate(`/films/${id}`);
    };

    return (
        <div className="App">

            <Slider />

            <Carousel
                title="Action Shows"
                items={actionShows}
                onClick={handleCardClick}
            />

            <Carousel
                title="Crime Shows"
                items={crimeShows}
                onClick={handleCardClick}
            />

            <Footer />
        </div>
    );
}

export default Home;
