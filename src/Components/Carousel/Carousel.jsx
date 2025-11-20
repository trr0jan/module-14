import React, { useRef } from "react";
import "./Carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({ title, items, onClick, onViewAll }) => {
    const rowRef = useRef();

    const scrollLeft = () => {
        rowRef.current.scrollBy({ left: -1000, behavior: "smooth" });
    };

    const scrollRight = () => {
        rowRef.current.scrollBy({ left: 1000, behavior: "smooth" });
    };

    return (
        <div className="carousel-wrapper">

            <div className="carousel-header">
                <div className="title">
                    <h2>{title}</h2>
                </div>
                
                <Link to="/films" className="view-all">
                    View All
                </Link>
            </div>

            <div className="carousel-arrow left" onClick={scrollLeft}>❮</div>
            <div className="carousel-arrow right" onClick={scrollRight}>❯</div>

            <div className="carousel-row" ref={rowRef}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="movie-card"
                        onClick={() => onClick(item.id)}
                    >
                        <div className="card-image">
                            <img
                                src={
                                    item.image?.original ||
                                    item.image?.medium ||
                                    "https://via.placeholder.com/450x250"
                                }
                                alt={item.name}
                            />

                            <div className="card-overlay">
                                <h3>{item.name}</h3>

                                <p>
                                    {item.runtime
                                        ? `${Math.floor(item.runtime / 60)} hr : ${(item.runtime % 60)
                                            .toString()
                                            .padStart(2, "0")} min`
                                        : "1 hr : 30 min"}
                                </p>

                                <button className="show-more">
                                    Show More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Carousel;
