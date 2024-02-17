import React, { useState } from 'react';
import axios from 'axios';
import { MoviesList } from '../cmps/MoviesList';
import { MoviesIndex } from './MoviesIndex';
export function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState()

    function handleInputChange(ev) {
        setSearchTerm(ev.target.value);
    }

    async function handleSearch(ev) {
        ev.preventDefault();
        const searchedMovies = await searchForMovie()
        setMovies(searchedMovies)
    }

    async function searchForMovie() {
        try {
            const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=2ff60abfe88b7a06269cb368c24bb201&query=${searchTerm}`;
            const response = await axios.get(endpoint);
            return response.data.results;
        } catch (error) {
            console.error('Error fetching movies', error);
            throw error;
        }
    }

    return (
        <>
            <div className="search-con">
                <section className="form-con w-full">

                    <form onSubmit={handleSearch}>
                        <span class="material-symbols-outlined">
                            search
                        </span>

                        <input type="text" onChange={handleInputChange} placeholder='Movies, Shows and more' />
                        {/* <button type="submit">Search</button> */}
                    </form>
                </section>
                {movies ? <MoviesIndex movies={movies} /> : <span>Search for your favorite movie/series...</span>}
            </div>
        </>
    );
}
