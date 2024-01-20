import React, { useState, useEffect } from 'react';
import { MovieInfo } from './MovieInfo';
export function HomeSuggestions({ movies }) {
    const imageUrlBase = 'https://image.tmdb.org/t/p/original/';
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMovieIndex(prevIndex => (prevIndex + 1) % movies.length);
        }, 10000)

        return () => clearInterval(intervalId)
    }, [movies?.length]);

    if (!movies) return <div>Loading...</div>;

    const currentMovie = movies[currentMovieIndex];

    return (
        <div className="home-suggestions relative text-center text-blue-500 w-full mr-6">
            <section className="relative">
                <div className="layer">
                    <img className="w-full image-style" style={{ height: '80vh' }} src={`${imageUrlBase}${currentMovie.backdrop_path}`} alt={currentMovie.original_title} />

                </div>
                <MovieInfo type={'Home'} movie={currentMovie} />

                <div className="overlay-container flex gap-1 absolute bottom-10 right-14">
                    {movies.slice(0, 8).map((movie, index) => (
                        <img
                            key={index}
                            className={`thumbnail rounded h-12 mb-3 ${index === currentMovieIndex ? 'border-highlight' : ''}`}
                            src={`${imageUrlBase}${movie.backdrop_path}`}
                            alt={movie.original_title}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
