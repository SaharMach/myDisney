import { useSelector, useDispatch } from 'react-redux'
import { MovieInfo } from './MovieInfo';

export function MovieDetails() {
    const movie = useSelector(storeState => storeState.moviesModule.movie)
    console.log(movie, 'from movie details');
    return <div className='info'>
        <div className='layer'>
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
        </div>
        <MovieInfo movie={movie} />


    </div>
}