import React, { useRef, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { MovieInfo } from "./MovieInfo"

export function MoviesPreview({ movies, onSelectMovie }) {
    const [hoveredMovieId, setHoveredMovieId] = useState(null)
    const containerRef = useRef(null)
    const movieRefs = useRef([])

    const isSpecialHover = (movieElement) => {
        if (!containerRef.current || !movieElement) return { isTop: false, isLeft: false }
        const containerRect = containerRef.current.getBoundingClientRect()
        const movieRect = movieElement.getBoundingClientRect()
        const isTopRow = movieRect.top === containerRect.top
        const isLeftMost = movieRect.left === containerRect.left

        return { isTop: isTopRow, isLeft: isLeftMost }
    };

    useEffect(() => {
        movieRefs.current = movieRefs.current.slice(0, movies?.length);
    }, [movies]);

    return (
        <div ref={containerRef} className="movies-preview flex-wrap mb-10">
            {movies?.map((movie, index) => (
                <Link key={movie.id} to={`/movie/${movie.id}`} ref={el => movieRefs.current[index] = el}>
                    <div
                        className="movie-card"
                        onMouseEnter={() => {
                            const { isTop, isLeft } = isSpecialHover(movieRefs.current[index])
                            setHoveredMovieId(movie.id);
                            const positionClass = `${isTop ? 'top' : ''} ${isLeft ? 'left' : ''}`.trim()
                            movie.positionClass = positionClass;
                            console.log(positionClass, 'pos class')
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
