import React, { useRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { MovieInfo } from "./MovieInfo";

export function MoviesPreview({ movies, onSelectMovie }) {
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const containerRef = useRef(null);
    const movieRefs = useRef([]);

    const isSpecialHover = (movieElement) => {
        if (!containerRef.current || !movieElement) return { isTop: false, isLeft: false };
        const containerRect = containerRef.current.getBoundingClientRect();
        const movieRect = movieElement.getBoundingClientRect();

        const topThreshold = 2;
        const leftThreshold = 2;
        const isTopRow = movieRect.top <= containerRect.top + topThreshold
        const isLeftMost = movieRect.left <= containerRect.left + leftThreshold

        return { isTop: isTopRow, isLeft: isLeftMost }
    };

    const uniqueMovies = movies?.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    useEffect(() => {
        movieRefs.current = movieRefs.current.slice(0, uniqueMovies?.length);

    }, [uniqueMovies]);


    return (
        <div ref={containerRef} className="movies-preview flex-wrap mb-10">
            {uniqueMovies?.map((movie, index) => (
                <Link key={movie.id} to={`/movie/${movie.id}`} ref={el => movieRefs.current[index] = el}>
                    <div
                        className="movie-card"
                        onMouseEnter={() => {
                            if (window.innerWidth >= 768) {
                                const { isTop, isLeft } = isSpecialHover(movieRefs.current[index]);
                                const positionClass = `${isTop ? 'top' : ''} ${isLeft ? 'left' : ''}`.trim();
                                movie.positionClass = positionClass;
                            }
                            setHoveredMovieId(movie.id);
                        }}
                        onMouseLeave={() => setHoveredMovieId(null)}
                        onClick={() => onSelectMovie(movie)}
                    >
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                        {hoveredMovieId === movie.id && (
                            <section className={`hovered-info ${movie.positionClass ? movie.positionClass : ''}`}>
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                                <MovieInfo type={'Preview'} movie={movie} />
                            </section>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}
