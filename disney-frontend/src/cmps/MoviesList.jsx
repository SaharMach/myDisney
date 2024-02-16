import { MoviesPreview } from "./MoviesPreview"
export function MoviesList({ type, movies, onSelectMovie }) {
    return (
        <div className={`movies-list ${type === 'Home' ? '' : 'ml'}`}>
            <MoviesPreview movies={movies} onSelectMovie={onSelectMovie} />
        </div>
    );
}
