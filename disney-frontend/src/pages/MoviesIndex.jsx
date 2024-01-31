import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { loadMovies } from "../store/movies.action";
import { MoviesList } from "../cmps/MoviesList";
import disneyImg from '../assets/imgs/disneyimg.jpeg'
import pixarImg from '../assets/imgs/pixarimg.jpeg'
import marvelImg from '../assets/imgs/marvelimg.jpeg'
import starWarsimg from '../assets/imgs/starwarsimg.jpeg'
import nationalGeoImg from '../assets/imgs/geoimg.jpeg'
import starImg from '../assets/imgs/starimg.jpeg'
import disneyLogo from '../assets/imgs/DSL.png'
import MarvelLogo from '../assets/imgs/MSL.png'
import NationalGeoLogo from '../assets/imgs/NSL.png'
import starWarsLogo from '../assets/imgs/SWSL.png'
import { setMovie } from "../store/movies.action";
import { useNavigate } from 'react-router';

export function MoviesIndex({ movies, type }) {
    console.log(movies);
    const { studioId } = useParams()
    const [moviesToShow, setMovies] = useState()
    const [imgToShow, setImg] = useState('')
    useEffect(() => {
        init();
    }, [studioId, movies])


    const duos = [
        { img: disneyImg, logo: disneyLogo, id: '3166' },
        { img: pixarImg, id: '3' },
        { img: marvelImg, logo: MarvelLogo, id: '7505' },
        { img: starWarsimg, logo: starWarsLogo, id: '95365' },
        { img: nationalGeoImg, logo: NationalGeoLogo, id: '114038' },
        { img: starImg, id: '88699' },
    ]

    async function init() {
        if (!movies) {
            const moviesData = await loadMovies(studioId);
            setMovies(moviesData);
            setImg(duos.find(duo => duo.id === studioId))
        }
        else setMovies(movies)
    }

    function onSelectMovie(movie) {
        setMovie(movie)
    }
    if (!movies) return <div>loading...</div>
    return (
        <div className="movies relative w-full flex flex-col">
            {imgToShow &&
                <img className="studio-img" src={imgToShow.img} alt="" />
            }
            <img className="logo" src={imgToShow?.logo} alt="" />
            <MoviesList type={type} movies={moviesToShow} onSelectMovie={onSelectMovie} />
        </div>
    )
}