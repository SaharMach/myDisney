import { useState } from "react";
import { Link } from "react-router-dom";
import { MovieInfo } from "./MovieInfo";
export function MoviesPreview({ movies, onSelectMovie }) {
    const [hoveredMovieId, setHoveredMovieId] = useState(null)

    const isSpecialHover = (index) => {
        return index % 7 === 0 || (index >= 0 && index < 7)
    }

    return (
        <div className="movies-preview flex-wrap mb-10">
            {movies.map((movie, index) => {
                const specialHover = isSpecialHover(index)
                return movie.backdrop_path && (
                    <>
                        <Link key={index} to={`/movie/${movie.id}`}>
                            <div
                                className="movie-card"
                                onMouseEnter={() => setHoveredMovieId(movie.id)}
                                onMouseLeave={() => setHoveredMovieId(null)}
                                onClick={() => onSelectMovie(movie)}
                            >
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                                {hoveredMovieId === movie.id && (
                                    <section className={`hovered-info ${specialHover ? "special-hover" : ""}`}>
                                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                                        <MovieInfo type={'Preview'} movie={movie} />
                                    </section>
                                )}
                            </div>
                        </Link>
                    </>
                )
            })}
        </div>
    );
}
