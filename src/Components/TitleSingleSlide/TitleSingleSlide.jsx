import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import './TitleSingleSlide.css';
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const [shows, setShows] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows?_embed=cast')
      .then(res => res.json())
      .then(data => {
        const topShows = data
          .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
          .slice(0, 5);
        setShows(topShows);
      });
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % shows.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + shows.length) % shows.length);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    const cleanText = text.replace(/<[^>]+>/g, '');
    return cleanText.length <= maxLength ? cleanText : cleanText.slice(0, maxLength) + '...';
  };

  return (
    <div className="slider">
      <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {shows.map(show => (
          <div
            className="slide"
            key={show.id}
            style={{ backgroundImage: `url(${show.image?.original})` }}
          >
            <div className="gradient"></div>
            <div className="slide-content">
              <h1>{show.name.toUpperCase()}</h1>
              <p className="description">{truncateText(show.summary, 200)}</p>

              {show._embedded?.cast?.length > 0 && (
                <p className="starring">
                  <strong className="sectionName">Starring:</strong> {show._embedded.cast.map(actor => actor.person.name).join(', ')}
                </p>
              )}

              {show.genres?.length > 0 && (
                <p className="genres">
                  <strong className="sectionName">Genres:</strong> {show.genres.join(', ')}
                </p>
              )}

              {show.tags && show.tags.length > 0 && (
                <p className="tags">
                  <strong className="sectionName">Tag:</strong> {show.tags.join(', ')}
                </p>
              )}
            <Button
              onClick={() => navigate(`/films/${show.id}`)}
              style={{
                border: '1px solid #E50914',
                borderRadius: '0',
                background: '#E50914',
                width: '110px',
                height: '30px',
                color: '#fff',
                textTransform: 'none'
              }}
            >
              Show more
            </Button>

            </div>
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
}
