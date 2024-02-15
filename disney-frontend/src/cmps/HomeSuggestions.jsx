import React, { useState, useEffect } from 'react';
import { MovieInfo } from './MovieInfo';

export function HomeSuggestions({ movies }) {
    const imageUrlBase = 'https://image.tmdb.org/t/p/original/';
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const thumbnailsToShow = 5;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMovieIndex(prevIndex => (prevIndex + 1) % movies.length);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [movies?.length]);

    if (!movies) return <div>Loading...</div>;

    const currentMovie = movies[currentMovieIndex];

    const handlePrevClick = () => {
        setCarouselIndex(prevIndex => Math.max(prevIndex - thumbnailsToShow, 0));
    };

    const handleNextClick = () => {
        setCarouselIndex(prevIndex => Math.min(prevIndex + thumbnailsToShow, movies.length - thumbnailsToShow));
    };

    const visibleThumbnails = movies.slice(carouselIndex, carouselIndex + thumbnailsToShow);

    return (
        <div className="home-suggestions relative text-center text-blue-500 w-full mr-6">
            <section className="relative">
                <div className="layer">
                    <img className="w-full image-style" style={{ height: '80vh' }} src={`${imageUrlBase}${currentMovie.backdrop_path}`} alt={currentMovie.original_title} />
                </div>
                <MovieInfo type={'Home'} movie={currentMovie} />

                <div className="overlay-container items-center gap-1 absolute bottom-10 right-14">
                    {carouselIndex > 0 && (
                        <button onClick={handlePrevClick} className="carousel-control"><span class="material-symbols-outlined">
                            chevron_left
                        </span></button>
                    )}
                    {visibleThumbnails.map((movie, index) => (
                        <img
                            key={index}
                            className={`thumbnail rounded h-12 gap-1 ${carouselIndex + index === currentMovieIndex ? 'border-highlight' : ''}`}
                            src={`${imageUrlBase}${movie.backdrop_path}`}
                            alt={movie.original_title}
                            onClick={() => setCurrentMovieIndex(carouselIndex + index)}
                        />
                    ))}

                    {carouselIndex < movies.length - thumbnailsToShow && (
                        <button onClick={handleNextClick} className="carousel-control"><span class="material-symbols-outlined">
                            chevron_right
                        </span></button>
                    )}
                </div>
            </section>
        </div>
    );
}
